"use client";

import { Component, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import Logo3D from "./Logo3D";

/* =========================================================
   TechnologyStage3D

   یک Canvas شفاف و fixed برای کل صفحه + یک لوگوی سه‌بعدی.
   لوگو دنبال المنت‌هایی می‌رود که data-logo-anchor دارند:

     hero    ← کنار تیتر (بزرگ)
     section ← بالای هدر هر سکشن (کوچک‌تر)
     بقیه‌ی زمان‌ها ← کنج پایین-چپ (dock)

   هر بار که مقصد عوض شود: چرخش کامل + پالس اندازه.
========================================================= */

const DOCK_MARGIN = 56;
const DOCK_SIZE = 60;
const CAMERA_Z = 10;
const CAMERA_FOV = 35;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/* =========================================================
   Ambient: حلقه‌ها، ذرات، Sparkles
========================================================= */

function Orbit({ radius, tilt, speed, color, opacity }) {
  const group = useRef(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += Math.min(delta, 0.05) * speed;
    }
  });

  return (
    <group rotation={tilt}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[radius, 0.01, 12, 160]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>

        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

function Shards({ color }) {
  const group = useRef(null);

  const shards = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2;
        const radius = 1.9 + ((i * 37) % 10) / 10;

        return {
          position: [
            Math.cos(angle) * radius,
            (((i * 53) % 10) / 10 - 0.5) * 3.2,
            Math.sin(angle) * radius,
          ],
          rotation: [i * 0.7, i * 1.3, i * 0.4],
          scale: 0.025 + ((i * 17) % 10) / 10 * 0.045,
          white: i % 4 === 0,
        };
      }),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += Math.min(delta, 0.05) * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <group ref={group}>
      {shards.map((shard, i) => (
        <mesh
          key={i}
          position={shard.position}
          rotation={shard.rotation}
          scale={shard.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={shard.white ? "#ffffff" : color}
            transparent
            opacity={shard.white ? 0.4 : 0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlowSprite({ color }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);

    gradient.addColorStop(0, "rgba(255,255,255,0.55)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.14)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite scale={[4.6, 4.6, 1]} position={[0, 0, -1.2]}>
      <spriteMaterial
        map={texture}
        color={color}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

/* =========================================================
   Rig: موقعیت، اندازه، چرخش و انیمیشن‌های لوگو
========================================================= */

function Rig({ technology }) {
  const { camera, size } = useThree();

  const { theme, motion } = technology;

  const rig = useRef(null);
  const logo = useRef(null);
  const ambient = useRef(null);
  const sparkles = useRef(null);

  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);

  const state = useRef({
    ready: false,
    x: 0,
    y: 0,
    size: 0,
    prevX: 0,
    prevY: 0,
    flip: 0,
    flipTarget: 0,
    flipDir: 1,
    punch: 0,
    active: null,
    intro: 0,
    anchors: [],
    frame: 0,
    scrollY: 0,
    scrollSpeed: 0,
    ambient: 1,
    roll: 0,
    pitch: 0,
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = media.matches;

    const onMedia = (e) => (reduced.current = e.matches);

    const onPointer = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    media.addEventListener?.("change", onMedia);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      media.removeEventListener?.("change", onMedia);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useFrame((frameState, delta) => {
    if (!rig.current || !logo.current || !ambient.current) return;

    const dt = Math.min(delta, 0.05);
    const st = state.current;
    const calm = reduced.current;

    const vw = size.width;
    const vh = size.height;
    const desktop = vw >= 1024;

    /* ---------- پیدا کردن مقصد ---------- */

    if (st.frame++ % 30 === 0) {
      st.anchors = Array.from(document.querySelectorAll("[data-logo-anchor]"));
    }

    let best = null;
    let bestDistance = Infinity;

    for (const el of st.anchors) {
      const isHero = el.dataset.logoAnchor === "hero";

      /* موبایل: فقط Hero */
      if (!desktop && !isHero) continue;

      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;

      const centerY = rect.top + rect.height / 2;

      const visible = desktop
        ? centerY > vh * 0.1 && centerY < vh * 0.9
        : rect.bottom > 0 && rect.top < vh;

      if (!visible) continue;

      const distance = Math.abs(centerY - vh / 2);

      if (distance < bestDistance) {
        best = { el, rect };
        bestDistance = distance;
      }
    }

    let targetX = st.x;
    let targetY = st.y;
    let targetSize = 0;
    let activeKey = "hidden";

    if (best) {
      const { el, rect } = best;

      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
      targetSize =
        Math.min(rect.width, rect.height) * (Number(el.dataset.logoScale) || 1);
      activeKey = el;
    } else if (desktop) {
      targetX = DOCK_MARGIN;
      targetY = vh - DOCK_MARGIN;
      targetSize = DOCK_SIZE;
      activeKey = "dock";
    }

    /* ---------- اولین فریم: بدون پرواز ---------- */

    if (!st.ready) {
      st.x = targetX;
      st.y = targetY;
      st.size = targetSize;
      st.prevX = targetX;
      st.prevY = targetY;
      st.active = activeKey;
      st.scrollY = window.scrollY;
      st.ready = true;
    }

    /* ---------- تغییر مقصد: چرخش + پالس ---------- */

    if (activeKey !== st.active) {
      if (!calm && activeKey !== "hidden" && st.active !== "hidden") {
        st.flipTarget += Math.PI * 2 * st.flipDir;
        st.flipDir *= -1;
        st.punch = 1;
      }
      st.active = activeKey;
    }

    /* ---------- حرکت نرم ---------- */

    const move = calm ? 40 : 7;

    st.x = THREE.MathUtils.damp(st.x, targetX, move, dt);
    st.y = THREE.MathUtils.damp(st.y, targetY, move, dt);
    st.size = THREE.MathUtils.damp(st.size, targetSize, calm ? 40 : 6, dt);

    const velX = (st.x - st.prevX) / Math.max(dt, 0.0001);
    const velY = (st.y - st.prevY) / Math.max(dt, 0.0001);
    st.prevX = st.x;
    st.prevY = st.y;

    st.flip = THREE.MathUtils.damp(st.flip, st.flipTarget, 3.2, dt);
    st.punch = THREE.MathUtils.damp(st.punch, 0, 4, dt);

    /* سرعت اسکرول → حلقه‌ها سریع‌تر می‌چرخند */
    const scrollDelta = Math.abs(window.scrollY - st.scrollY) / Math.max(dt, 0.0001);
    st.scrollY = window.scrollY;
    st.scrollSpeed = THREE.MathUtils.damp(
      st.scrollSpeed,
      clamp(scrollDelta / 2500, 0, 2.5),
      4,
      dt
    );

    /* ---------- ورود اولیه ---------- */

    st.intro = calm ? 1 : Math.min(1, st.intro + dt / 1.6);

    /* ---------- تبدیل پیکسل به واحد صحنه ---------- */

    const unitsPerPixel =
      (2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2))) / vh;

    const worldX = (st.x - vw / 2) * unitsPerPixel;
    const worldY = -(st.y - vh / 2) * unitsPerPixel;

    const baseScale = (st.size * unitsPerPixel) / 2;
    const introScale = Math.max(0.0001, easeOutBack(st.intro));
    const punchScale = 1 + st.punch * 0.22;

    rig.current.position.set(worldX, worldY, 0);
    rig.current.scale.setScalar(
      Math.max(0.0001, baseScale * introScale * punchScale)
    );

    /* ---------- چرخش لوگو ---------- */

    const t = frameState.clock.elapsedTime;

    const idleY = calm ? 0 : Math.sin(t * 0.6) * 0.35;
    const idleX = calm ? 0 : Math.sin(t * 0.45) * 0.08;
    const introSpin = (1 - easeOutCubic(st.intro)) * -Math.PI * 1.5;

    st.roll = THREE.MathUtils.damp(st.roll, clamp(-velX * 0.0009, -0.45, 0.45), 6, dt);
    st.pitch = THREE.MathUtils.damp(st.pitch, clamp(velY * 0.0007, -0.35, 0.35), 6, dt);

    logo.current.rotation.set(
      idleX - pointer.current.y * 0.25 + st.pitch,
      st.flip + introSpin + idleY + pointer.current.x * 0.4,
      st.roll
    );

    logo.current.position.y = calm ? 0 : Math.sin(t * 1.2) * 0.06;

    /* ---------- ambient ---------- */

    const docked = activeKey === "dock";

    st.ambient = THREE.MathUtils.damp(st.ambient, docked ? 0.85 : 1, 4, dt);
    ambient.current.scale.setScalar(st.ambient);
    ambient.current.rotation.z += dt * st.scrollSpeed * 0.8;

    if (sparkles.current) sparkles.current.visible = !docked && !calm;
  });

  return (
    <group ref={rig}>
      <GlowSprite color={theme.primary} />

      <group ref={logo}>
        <Logo3D logo={motion.logo} theme={theme} />
      </group>

      <group ref={ambient}>
        <Orbit
          radius={1.55}
          tilt={[Math.PI / 2.3, 0, 0]}
          speed={0.5}
          color={theme.primary}
          opacity={0.5}
        />
        <Orbit
          radius={1.9}
          tilt={[Math.PI / 3, Math.PI / 5, 0]}
          speed={-0.35}
          color={theme.primary}
          opacity={0.3}
        />
        <Orbit
          radius={2.25}
          tilt={[Math.PI / 5, -Math.PI / 4, Math.PI / 7]}
          speed={0.22}
          color={theme.secondary || theme.primary}
          opacity={0.18}
        />

        <Shards color={theme.primary} />

        <group ref={sparkles}>
          <Sparkles
            count={60}
            scale={[5, 4.5, 4]}
            size={2.4}
            speed={0.3}
            color={theme.primary}
            opacity={0.9}
          />
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   اگر WebGL نبود، صفحه نباید خراب شود
========================================================= */

class StageBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function TechnologyStage3D({ technology }) {
  const theme = technology.theme;

  return (
    <StageBoundary>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
      >
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 6]} intensity={2.2} />

          {/* محیط بازتاب ساخته‌شده محلی (بدون دانلود HDR) */}
          <Environment resolution={128}>
            <Lightformer
              form="rect"
              intensity={4}
              position={[0, 4, 6]}
              scale={[10, 3, 1]}
            />
            <Lightformer
              form="rect"
              intensity={3}
              color={theme.primary}
              position={[-6, 0, 2]}
              rotation-y={Math.PI / 2}
              scale={[2, 8, 1]}
            />
            <Lightformer
              form="ring"
              intensity={3}
              color={theme.secondary || theme.primary}
              position={[0, -3, -4]}
              scale={4}
            />
          </Environment>

          <Rig technology={technology} />
        </Canvas>
      </div>
    </StageBoundary>
  );
}

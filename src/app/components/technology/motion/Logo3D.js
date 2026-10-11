"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/* =========================================================
   Logo3D
   لوگوی سه‌بعدی را از روی داده (logo.layers) می‌سازد.
   هیچ چیز مخصوص یک تکنولوژی در این فایل نیست.
========================================================= */

const UNIT = 0.02; // بوم 100×100 ← 2 واحد در صحنه

const loader = new SVGLoader();

function parsePaths(d) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${d}"/></svg>`;
  return loader.parse(svg).paths;
}

function resolveColor(color, theme) {
  if (color === "primary") return theme.primary;
  if (color === "secondary") return theme.secondary || theme.primary;
  if (color === "dark") return "#07100b";
  return color || theme.primary;
}

/* نقطه‌های یک مسیر را متراکم می‌کنیم تا گوشه‌ها در لوله خراب نشوند */
function densify(points, step = 1.2) {
  const out = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    out.push(a.clone());
    const b = points[i + 1];
    if (!b) break;
    const count = Math.floor(a.distanceTo(b) / step);
    for (let k = 1; k < count; k++) {
      out.push(a.clone().lerp(b, k / count));
    }
  }
  return out;
}

function buildTubes(d, radius) {
  const geometries = [];
  const caps = [];

  parsePaths(d).forEach((shapePath) => {
    shapePath.subPaths.forEach((subPath) => {
      let points = densify(
        subPath.getPoints(24).map((p) => new THREE.Vector3(p.x, p.y, 0))
      );

      if (points.length < 2) return;

      const closed = points[0].distanceTo(points[points.length - 1]) < 0.001;
      if (closed) points.pop();

      const curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");

      geometries.push(
        new THREE.TubeGeometry(
          curve,
          Math.max(24, points.length * 2),
          radius,
          12,
          closed
        )
      );

      if (!closed) {
        caps.push(points[0].clone(), points[points.length - 1].clone());
      }
    });
  });

  return { geometries, caps };
}

function buildItems(logo) {
  const baseDepth = logo.depth ?? 10;
  const items = [];

  logo.layers.forEach((layer) => {
    const z = layer.z ?? 0;

    if (layer.type === "path") {
      const shapes = parsePaths(layer.d).flatMap((p) => SVGLoader.createShapes(p));
      const bevel = layer.bevel ?? 0.9;

      items.push({
        geometry: new THREE.ExtrudeGeometry(shapes, {
          depth: layer.depth ?? baseDepth,
          bevelEnabled: true,
          bevelThickness: bevel,
          bevelSize: bevel,
          bevelSegments: 4,
          curveSegments: 28,
        }),
        position: [0, 0, z],
        color: layer.color,
        glow: layer.glow,
      });
    }

    if (layer.type === "tube") {
      const { geometries, caps } = buildTubes(layer.d, layer.radius ?? 2.5);

      geometries.forEach((geometry) => {
        items.push({
          geometry,
          position: [0, 0, z],
          color: layer.color,
          glow: layer.glow ?? 0.6,
        });
      });

      caps.forEach((cap) => {
        items.push({
          geometry: new THREE.SphereGeometry(layer.radius ?? 2.5, 16, 16),
          position: [cap.x, cap.y, z],
          color: layer.color,
          glow: layer.glow ?? 0.6,
        });
      });
    }

    if (layer.type === "ring") {
      const p = layer.position ?? [50, 50, 0];

      items.push({
        geometry: new THREE.TorusGeometry(layer.radius, layer.tube ?? 2, 20, 96),
        position: [p[0], p[1], p[2] ?? baseDepth / 2],
        rotation: layer.rotation,
        scale: layer.scale,
        color: layer.color,
        glow: layer.glow,
      });
    }

    if (layer.type === "sphere") {
      items.push({
        geometry: new THREE.SphereGeometry(layer.radius, 40, 40),
        position: layer.position ?? [50, 50, 0],
        color: layer.color,
        glow: layer.glow ?? 0.5,
      });
    }
  });

  return { items, depth: baseDepth };
}

export default function Logo3D({ logo, theme }) {
  const { items, depth } = useMemo(() => buildItems(logo), [logo]);

  const materials = useMemo(() => {
    const cache = new Map();

    items.forEach((item) => {
      const hex = resolveColor(item.color, theme);
      const dark = item.color === "dark";
      const glow = item.glow ?? (dark ? 0 : 0.18);
      const key = `${hex}-${glow}`;

      if (!cache.has(key)) {
        cache.set(
          key,
          new THREE.MeshPhysicalMaterial({
            color: hex,
            metalness: dark ? 0.15 : 0.5,
            roughness: dark ? 0.55 : 0.26,
            clearcoat: dark ? 0 : 1,
            clearcoatRoughness: 0.12,
            emissive: dark ? "#000000" : hex,
            emissiveIntensity: glow,
          })
        );
      }

      item.materialKey = key;
    });

    return cache;
  }, [items, theme]);

  useEffect(() => {
    return () => {
      items.forEach((item) => item.geometry.dispose());
      materials.forEach((material) => material.dispose());
    };
  }, [items, materials]);

  return (
    /* منفی بودن scale محور Y، چون SVG رو به پایین است */
    <group scale={[UNIT, -UNIT, UNIT]}>
      <group position={[-50, -50, -depth / 2]}>
        {items.map((item, index) => (
          <mesh
            key={index}
            geometry={item.geometry}
            material={materials.get(item.materialKey)}
            position={item.position}
            rotation={item.rotation}
            scale={item.scale}
          />
        ))}
      </group>
    </group>
  );
}

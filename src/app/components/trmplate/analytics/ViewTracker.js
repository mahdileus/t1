// components/analytics/ViewTracker.jsx
"use client";

import { useEffect } from "react";

export default function ViewTracker({ targetType, targetId, path, title }) {
  useEffect(() => {
    if (!targetType || !path) return;

    fetch("/api/analytics/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetType,
        targetId,
        path,
        title,
      }),
    }).catch(() => {});
  }, [targetType, targetId, path, title]);

  return null;
}

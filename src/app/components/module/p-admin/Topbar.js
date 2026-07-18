"use client";

import { useEffect, useMemo, useState } from "react";

export default function Topbar() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { persianDate, persianTime } = useMemo(() => {
    if (!now) {
      return {
        persianDate: "",
        persianTime: "",
      };
    }

    const dateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tehran",
    });

    const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Tehran",
    });

    return {
      persianDate: dateFormatter.format(now),
      persianTime: timeFormatter.format(now),
    };
  }, [now]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 px-4 py-3 font-yekan-bakh shadow-sm backdrop-blur-xl md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
            aria-hidden="true"
          >
            ت
          </span>

          <div>
            <p className="text-sm font-bold text-primary md:text-base">
              ادمین عزیز، خوش اومدی
            </p>
            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              مدیریت وب‌سایت تیوان
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <div className="rounded-full border border-gray-100 bg-gray-50 px-4 py-2 text-gray-700">
            {persianDate || "در حال دریافت تاریخ..."}
          </div>

          <div className="rounded-full bg-primary px-4 py-2 font-semibold text-white">
            {persianTime || "--:--:--"}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { IoIosArrowUp } from "react-icons/io";

export default function ScrollTopButton() {
  return (
    <div className="mt-8 flex">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="cursor-pointer rounded-l-full bg-third p-5 text-white transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-third focus-visible:ring-offset-2"
        aria-label="بازگشت به بالای صفحه"
      >
        <IoIosArrowUp size={20} aria-hidden="true" />
      </button>
    </div>
  );
}

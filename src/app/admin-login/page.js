"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert";
import { showSwal } from "../utils/helpers";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../utils/auth-client";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginWithPassword = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "چشم");
    }

    const isValidEmail = validateEmail(phoneOrEmail);
    const isValidPhone = validatePhone(phoneOrEmail);

    if (!isValidEmail && !isValidPhone) {
      return showSwal(
        "ایمیل وارد شده یا شماره همراه صحیح نیست",
        "error",
        "تلاش مجدد"
      );
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد یا ایمیل نادرست میباشد", "error", "تلاش مجدد");
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneOrEmail, password }),
      });

      if (res.status === 200) {
        Swal({
          title: "با موفقیت وارد شدید",
          icon: "success",
          buttons: "ورود به پنل کاربری",
        }).then(() => {
          router.replace("/p-admin");
        });
      } else if (res.status === 422 || res.status === 401) {
        showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
      } else if (res.status === 419) {
        showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
      } else {
        showSwal("خطایی رخ داد، دوباره تلاش کنید", "error", "تلاش مجدد");
      }
    } catch (error) {
      console.error("Login error:", error);
      showSwal("ارتباط با سرور برقرار نشد", "error", "تلاش مجدد");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8 font-yekan-bakh"
    >
      {/* بک‌گراند خلاقانه */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_45%,#fff7f0_100%)]" />

      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

      {/* خطوط دکوراتیو */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/70 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:grid-cols-2">

          {/* سمت راست / بخش معرفی */}
          <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0f172a] via-[#132238] to-[#1e293b] p-10 text-white">
            <div className="absolute top-10 left-10 h-28 w-28 rounded-full border border-white/10 bg-white/10 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-orange-400/20 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl">
                T1 Dashboard
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight">
                ورود به
                <span className="mr-2 text-orange-400">پنل کاربری</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-8 text-white/75">
                شرکت تیوان با تخصص در ارائه خدمات دیجیتال مارکتینگ، طراحی وب‌سایت اختصاصی و برنامه‌نویسی حرفه‌ای، به کسب‌وکارها کمک می‌کند تا در فضای آنلاین بدرخشند.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                  <span className="text-sm font-medium text-white/90">
                    طراحی مینیمال و لوکس
                  </span>
                </div>
                <p className="text-sm leading-7 text-white/70">
                  هنر ترکیب رنگ در یک فضای روشن و مدرن.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-sm text-white/75 backdrop-blur-xl">
                <span>ورود سریع</span>
                <span>با موبایل یا ایمیل</span>
              </div>
            </div>
          </div>

          {/* سمت چپ / فرم */}
          <div className="relative flex items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-right">
                <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs text-slate-600 shadow-sm backdrop-blur-xl lg:hidden">
                  Kamay Dashboard
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900">
                  خوش اومدی 👋
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  برای ورود به حساب، اطلاعات خود را وارد کنید.
                </p>
              </div>

              <form onSubmit={loginWithPassword} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    شماره موبایل یا ایمیل
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً 09123456789 یا example@gmail.com"
                    value={phoneOrEmail}
                    onChange={(event) => setPhoneOrEmail(event.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f172a] focus:ring-4 focus:ring-slate-200/70"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0f172a] focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0f172a] text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:scale-[1.01] hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 opacity-0 transition group-hover:opacity-100" />
                  <span className="relative z-10">
                    {isSubmitting ? "در حال ورود..." : "ورود به حساب"}
                  </span>
                </button>

                <div className="flex items-center justify-between pt-2 text-sm">
                  <Link
                    href="/"
                    className="text-slate-500 transition hover:text-slate-800"
                  >
                    بازگشت به صفحه اصلی
                  </Link>
                </div>
              </form>

              <div className="mt-8 rounded-3xl border border-orange-100 bg-gradient-to-l from-orange-50 to-white p-4 text-xs leading-7 text-slate-500 shadow-sm">
                دسترسی شما با امنیت بالا انجام می‌شود و این طراحی برای تجربه‌ای
                سریع، آرام و حرفه‌ای بهینه شده است.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

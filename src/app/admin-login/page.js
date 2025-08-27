"use client"
import Link from "next/link";
import { showSwal } from "../utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "../utils/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert";

export default function Login() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");


  const loginWithPassword = async (event) => {
    event.preventDefault();
    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "چشم");
    }

    const isValidEmail = validateEmail(phoneOrEmail);
    const isValidatePhone = validatePhone(phoneOrEmail);
    if (!isValidEmail && !isValidatePhone) {
      return showSwal("ایمیل وارد شده یا شماره همراه صحیح نیست", "error", "تلاش مجدد");
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد یا ایمیل نادرست میباشد", "error", "تلاش مجدد");
    }

    const user = { phoneOrEmail, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    console.log("Res ->", res);
    if (res.status === 200) {

      Swal({
        title: "با موفقیت لاگین شدین",
        icon: "success",
        buttons: "ورود به پنل کاربری",
      }).then(() => {
          router.replace("/p-admin");

      });

    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
    } else if (res.status === 419) {
      showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
    }
  };



  return (

          <div className="flex items-center bg-[#7d9add75] justify-center min-h-screen px-6 relative z-10 font-yekan-bakh">
            <div className="w-full relative max-w-md bg-white/40 backdrop:blur-3xl p-8 rounded-2xl shadow-xl border border-white/40 z-30">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-secondery rounded-full animate-pulse -z-10 opacity-100"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary rounded-full animate-pulse -z-10 opacity-100"></div>
              <h2 className="text-2xl font-bold text-primary text-center mb-8">ورود به حساب</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="شماره موبایل یا ایمیل"
                  value={phoneOrEmail}
                  onChange={(event) => setPhoneOrEmail(event.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-[#3F72AF]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="رمز عبور"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-[#3F72AF]"
                />

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 cursor-pointer rounded-lg hover:bg-secondery transition duration-200"
                  onClick={loginWithPassword}
                >
                  ورود
                </button>
                <Link href={"/"} className="text-sm text-center py-1 block text-primary hover:underline cursor-pointer">
                  لغو
                </Link>
              </form>
            </div>
          </div>
  );
}

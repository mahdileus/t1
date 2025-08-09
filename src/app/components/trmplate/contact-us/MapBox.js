"use client"

import { FaMapPin } from "react-icons/fa";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { PiTelegramLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi"

const MapBox = () => {
  return (
    <div className="container py-15 mt-16 font-yekan-bakh">
      <div className="border border-third rounded-2xl">
        <div className="py-10 text-center font-yekan-bakh text-white font-bold text-3xl text-cream bg-third rounded-t-2xl">
          <h2>تماس با ما</h2>
        </div>

        {/* responsive layout */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* فرم تماس */}
          <div className="p-6 lg:p-10 w-full lg:w-[30%]">
            <h2 className="font-dana font-medium text-xl text-primary text-center py-2">
              منتطر پیام های شما هستیم
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-[#3F72AF]"
              />
              <input
                type="text"
                placeholder="ایمیل"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-[#3F72AF]"
              />
              <textarea
                placeholder="پیام شما"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-[#3F72AF]"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 cursor-pointer rounded-lg hover:bg-secondery transition duration-200"
              >
                ارسال
              </button>
            </form>
            <div className="flex gap-4 mt-5 text-2xl justify-center text-[#112D4E]">
              <PiInstagramLogo className="hover:text-[#3F72AF] cursor-pointer" />
              <PiTelegramLogo className="hover:text-[#3F72AF] cursor-pointer" />
              <PiYoutubeLogo className="hover:text-[#3F72AF] cursor-pointer" />
            </div>
          </div>

          {/* اطلاعات تماس */}
          <div className="p-6 lg:p-10 w-full lg:w-[30%]">
            <h2 className=" font-medium text-xl text-primary text-center py-2">
              باما در ارتباط باشید.
            </h2>
            <p className="text-center mb-4">
              لطفا پییشنهادات و انتقادات خودرا با ما درمیان بگزارید.
            </p>

            <div className="flex flex-col gap-8">
              {/* آدرس */}
              <div className="flex items-start gap-3 mt-6">
                <FaMapPin className="text-secondery w-6 h-6 mt-1" />
                <div>
                  <p className="font-bold text-primary text-lg">آدرس :</p>
                  <p className="text-gray-700 text-base leading-6">
                    تهران - خیابان ولیعصر - نبش طالفانی - مجتمع تجاری اداری نور - طبفه سوم - واحد 11050
                  </p>
                </div>
              </div>

              {/* شماره تماس */}
              <div className="flex items-start gap-3">
                <IoMdCall className="text-secondery w-6 h-6 mt-1" />
                <div>
                  <p className="font-bold text-primary text-lg">شماره تماس :</p>
                  <p className="text-gray-700 text-base">09123456789</p>
                </div>
              </div>

              {/* ایمیل */}
              <div className="flex items-start gap-3">
                <IoMdMail className="text-secondery w-6 h-6 mt-1" />
                <div>
                  <p className="font-bold text-primary text-lg">ایمیل :</p>
                  <p className="text-gray-700 text-base">t1w@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* نقشه */}
          <div className="p-6 lg:p-10 w-full lg:w-[40%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1362.1670171289556!2d51.404116554169576!3d35.70660252149603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e011237847dcd%3A0xcfed7552490962f5!2sNoor-e%20Tehran%20Shopping%20Center!5e0!3m2!1sen!2sus!4v1754731963843!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="rounded-lg min-h-[300px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapBox;

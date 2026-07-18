import Image from "next/image";

export default function WebHeader() {
  return (
    <section className="mt-36 font-yekan-bakh">
      <div className="container flex flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-20">
        <div className="w-full text-justify md:w-1/2">
          <h1 className="text-center text-3xl font-extrabold leading-[1.7] text-primary md:text-right md:text-4xl">
            طراحی سایت وردپرس حرفه‌ای
          </h1>

          <p className="mt-5 text-sm leading-8 text-gray-700 md:text-base md:leading-9">
            شرکت تیوان با سال‌ها تجربه در حوزه دیجیتال مارکتینگ و طراحی وبسایت،
            خدمات تخصصی طراحی سایت وردپرس را برای کسب‌وکارهای مختلف ارائه
            می‌دهد. وردپرس به‌عنوان محبوب‌ترین سیستم مدیریت محتوا در جهان، به
            شما این امکان را می‌دهد تا بدون محدودیت، یک وبسایت سریع، امن و
            کاملاً ریسپانسیو داشته باشید. تیم ما با تمرکز بر سئو داخلی و خارجی،
            طراحی کاربرپسند و بهینه‌سازی سرعت سایت، به شما کمک می‌کند تا در
            نتایج گوگل رتبه بالاتری بگیرید و مشتریان بیشتری جذب کنید.
            <br />
            <br />
            در تیوان ما تنها یک وبسایت ساده تحویل نمی‌دهیم، بلکه بستری برای رشد
            کسب‌وکار شما ایجاد می‌کنیم. از طراحی فروشگاه اینترنتی گرفته تا سایت
            شرکتی و آموزشی، تمامی پروژه‌ها به‌صورت اختصاصی و مطابق با نیازهای
            شما پیاده‌سازی می‌شوند. پشتیبانی حرفه‌ای، آموزش کار با پنل مدیریت
            وردپرس و ارائه راهکارهای بهینه‌سازی تجربه کاربری (UX) از دیگر خدمات
            ماست. اگر به دنبال یک سایت زیبا، سریع و سئو شده هستید، طراحی سایت
            وردپرس توسط تیوان بهترین انتخاب برای شماست.
          </p>
        </div>

        <div className="flex w-full items-center justify-center rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-lg shadow-gray-200/70 backdrop-blur-3xl md:w-1/2">
          <Image
            className="h-auto w-full max-w-[500px] select-none"
            src="/images/wordpress.png"
            width={500}
            height={500}
            alt="طراحی سایت وردپرس حرفه‌ای"
            priority
          />
        </div>
      </div>
    </section>
  );
}

"use client"

import Image from "next/image";


export default function WebHeader() {


    return (
        <>
            <section className=" mt-36 font-yekan-bakh">
                {/* about us section */}
                <div className="container flex flex-col-reverse md:flex-row justify-between items-center gap-28">
                    <div className="w-full md:w-1/2 text-justify">
                        <h1 className="text-4xl font-bold text-center md:text-right text-primary"> طراحی سایت وردپرس حرفه‌ای</h1>
                        <h4 className="text-base mt-4">شرکت تیوان با سال‌ها تجربه در حوزه دیجیتال مارکتینگ و طراحی وبسایت، خدمات تخصصی طراحی سایت وردپرس را برای کسب‌وکارهای مختلف ارائه می‌دهد. وردپرس به‌عنوان محبوب‌ترین سیستم مدیریت محتوا در جهان، به شما این امکان را می‌دهد تا بدون محدودیت، یک وبسایت سریع، امن و کاملاً ریسپانسیو داشته باشید. تیم ما با تمرکز بر سئو داخلی و خارجی، طراحی کاربرپسند و بهینه‌سازی سرعت سایت، به شما کمک می‌کند تا در نتایج گوگل رتبه بالاتری بگیرید و مشتریان بیشتری جذب کنید.
                            <br/>
                            در تیوان ما تنها یک وبسایت ساده تحویل نمی‌دهیم، بلکه بستری برای رشد کسب‌وکار شما ایجاد می‌کنیم. از طراحی فروشگاه اینترنتی گرفته تا سایت شرکتی و آموزشی، تمامی پروژه‌ها به‌صورت اختصاصی و مطابق با نیازهای شما پیاده‌سازی می‌شوند. پشتیبانی حرفه‌ای، آموزش کار با پنل مدیریت وردپرس و ارائه راهکارهای بهینه‌سازی تجربه کاربری (UX) از دیگر خدمات ماست. اگر به دنبال یک سایت زیبا، سریع و سئو شده هستید، طراحی سایت وردپرس توسط تیوان بهترین انتخاب برای شماست.</h4>


                    </div>
                    <div className="bg-white/80 backdrop:blur-3xl rounded-4xl flex items-center justify-center shadow-md p-5 w-full md:w-1/2">
                        <Image className="select-none"
                            src={"/images/wordpress.png"}
                            width={500}
                            height={500}
                            alt="seo-image"

                        />

                    </div>

                </div>

            </section>

        </>
    );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CiMenuFries, CiUser, } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { PiTelegramLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi";
import MobileNav from "./MobileNav";

export default function MobileHeader({ isLogin }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="relative">
            {/* Overlay blur background */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-[9998]"
                    onClick={toggleMobileMenu}
                ></div>
            )}

            <nav className="block lg:hidden container mt-3 py-5 pr-3 pl-1 mx-auto bg-[#f5f5f53d] backdrop-blur-2xl rounded-xl sticky top-3 shadow-md z-[9999]">
                <div className="px-1.5 flex flex-wrap items-center justify-between mx-auto">
                    <button className="p-2" onClick={toggleMobileMenu} type="button">
                        <CiMenuFries className="text-2xl text-primary" />
                    </button>

                    <div className="flex items-center justify-center gap-3">
                        <div className="text-white font-yekan-bakh">
                            <span className="block font-bold font-Yekan-Bakh">طراحی سایت</span>
                            <span className="block font-bold text-center">تیوان</span>
                        </div>

                        <Link href="/" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="52.25" height="59.312" viewBox="0 0 52.25 59.312">
                                <g id="logo" transform="translate(-742.691 -73.077)">
                                    <path id="Path_1894" data-name="Path 1894"
                                        d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
                                        transform="translate(-2975)" fill="#173372" />
                                    <path id="Path_1895" data-name="Path 1895"
                                        d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
                                        transform="translate(-3207.251 -96.367)" fill="#ff9436" />
                                </g>
                            </svg>
                        </Link>

                    </div>

                </div>
            </nav>

            {/* Mobile Menu Boxed */}
            <div
                className={`fixed top-6 right-0 bottom-6 w-[65%] bg-gray-100/90 backdrop-blur-2xl shadow-xl transform transition-transform duration-300 ease-in-out rounded-2xl overflow-hidden ${isMobileMenuOpen ? "translate-x-0 right-6" : "translate-x-full"
                    } z-[9999] flex flex-col justify-between lg:hidden`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40.25" height="40.312" viewBox="0 0 52.25 59.312">
                            <g id="logo" transform="translate(-742.691 -73.077)">
                                <path id="Path_1894" data-name="Path 1894"
                                    d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
                                    transform="translate(-2975)" fill="#173372" />
                                <path id="Path_1895" data-name="Path 1895"
                                    d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
                                    transform="translate(-3207.251 -96.367)" fill="#ff9436" />
                            </g>
                        </svg>
                    </div>
                    <button onClick={toggleMobileMenu} className="text-secondery hover:text-red-500">
                        <IoMdClose className="text-2xl text-red-500" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4 ">
                    <MobileNav onClick={() => setIsMobileMenuOpen(false)} />
                </div>

                {/* Bottom Part */}
                <div className="p-4 border-t border-gray-300 bg-cream/95 mt-auto">
                    <div className="flex gap-x-2 items-center justify-center mb-4">
                        <div className="bg-light-blue text-xl text-secondery p-1.5 cursor-pointer rounded-xl">
                            <PiInstagramLogo size={24} />
                        </div>
                        <div className="bg-light-blue text-xl text-secondery p-1.5 cursor-pointer rounded-xl">
                            <PiTelegramLogo size={24} />
                        </div>
                        <div className="bg-light-blue text-xl text-secondery p-1.5 cursor-pointer rounded-xl">
                            <PiYoutubeLogo size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

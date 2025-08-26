"use client"
import React from 'react'



import Link from 'next/link'
import { usePathname } from 'next/navigation'


const links = [
    {
        name: "صفحه اصلی",
        path: "/",
    },
    {
        name: " سئو",
        path: "/seo",
    },
    {
        name: " طراحی وبسایت",
        path: "/web-design",
    },
    {
        name: " برنامه نویسی",
        path: "/programing",
    },
    {
        name: "نمونه کار ها",
        path: "/portfolios",
    },
    {
        name: "مقالات",
        path: "/posts",
    },
    {
        name: "درباره ما",
        path: "/about-us",
    },
    {
        name: "تماس باما",
        path: "/contact-us",
    }
];

function Nav() {
    const pathName = usePathname()
    return (
        <nav className='hidden lg:flex items-center justify-around px-10 lg:px-1.5 font-yekan-bakh text-primary text-base lg:text-lg pt-4'>
            {links.map((link, index) => {
                return <Link href={link.path} key={index} className={`${link.path === pathName && "text-primary border-b-2 px-2 border-secondery"
                    } font-medium hover:text-secondery px-4 transition-all`}>
                    {link.name}
                </Link>
            })}
        </nav>
    )
}

export default Nav
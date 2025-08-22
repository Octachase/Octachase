"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import LogoImage from "@/assets/logo.svg";

import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
	const pathname = usePathname();
	const user = useSelector(useUserSlice);

	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="w-[100vw] overflow-x-hidden h-[88px] bg-[rgba(0,0,0,0.9)] z-[3] fixed top-0 left-0 border-b-[1px] px-4 lg:px-[80px] flex items-center  justify-between ">
			<Link href="/">
				<div className="w-[134px] h-[59px] relative">
					<Image src={LogoImage} fill alt="Logo Image" />
				</div>
			</Link>

			{/* nav links */}
			<aside
				className={`${
					showMenu ? "flex" : "hidden"
				} fixed top-0 left-0 md:w-2/3  z-[5] lg:relative p-6 w-full bg-black lg:bg-transparent lg:w-[65%] lg:flex flex-col lg:flex-row h-screen lg:h-auto lg:justify-between lg:items-center`}>
				<div className="flex h-10 justify-end lg:hidden mb-6">
					<button className="flex items-center justify-center" onClick={() => setShowMenu(false)}>
						<IoClose className="text-4xl" />
					</button>
				</div>

				<nav className="w-full lg:w-auto flex flex-col lg:flex-row  lg:p-0  lg:relative">
					<ul className="flex flex-col lg:flex-row  lg:items-center gap-3 text-[12px] font-medium">
						<li>
							<Link href="/" className={`block p-[8px] mb-4 lg:mb-0 ${pathname === "/" ? "text-sec" : "hover:text-sec"} font-bold`}>
								HOME
							</Link>
						</li>
						<li>
							<Link href="/about" className={`block p-[8px] mb-4 lg:mb-0 ${pathname === "/about" ? "text-sec" : "hover:text-sec"} font-bold`}>
								ABOUT US
							</Link>
						</li>
						<li>
							<Link href="/faq" className={`block p-[8px] mb-4 lg:mb-0 ${pathname === "/faq" ? "text-sec" : "hover:text-sec"} font-bold`}>
								FAQS
							</Link>
						</li>
						<li>
							<Link href="/contacts" className={`block p-[8px] mb-4 lg:mb-0 ${pathname === "/contacts" ? "text-sec" : "hover:text-sec"} font-bold`}>
								CONTACTS
							</Link>
						</li>
					</ul>
				</nav>
				<div className="w-full flex  items-center justify-between lg:w-auto mt-6 lg:mt-0">
					{/* button group */}
					{!user?._id && (
						<div className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-[10px]">
							<Link href="/login" className="w-full lg:w-auto bg-transparent hover:bg-opacity-70 border-[1px] border-sec text-[15px] px-[20px] py-4 lg:py-[8px] font-bold rounded-md">
								Login
							</Link>
							<Link href="/signup" className="w-full lg:w-auto py-4 bg-sec hover:bg-opacity-70  text-sm font-bold px-[20px] lg:py-[10px] rounded-md">
								Signup
							</Link>
						</div>
					)}
					{user?._id && (
						<div className="w-full lg:w-auto flex items-center gap-[10px]">
							<Link href={user?.isAdmin ? "/admin" : "/dashboard"} className="w-full lg:w-auto py-4 bg-sec hover:bg-opacity-70  text-sm font-bold px-[20px] lg:py-[10px] rounded-md">
								{user?.isAdmin ? "Admin" : "Dashboard"}
							</Link>
						</div>
					)}
				</div>
			</aside>
			<button className="flex items-center justify-center lg:hidden" onClick={() => setShowMenu(true)}>
				<MdMenu className="text-3xl" />
			</button>
		</div>
	);
};

export default Navbar;

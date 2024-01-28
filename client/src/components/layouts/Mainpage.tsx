"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import AccountInformation from "../molecules/AccountInformation";
import ProtectedRoute from "../molecules/ProtectedRoute";
import useLogout from "@/hooks/useLogout";

import LogoImage from "@/assets/logo.svg";

import { IoMdMenu } from "react-icons/io";
import { MdOutlineAccountBalanceWallet, MdClose } from "react-icons/md";
import { CiDollar, CiImport } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";
import { FaPowerOff, FaUser } from "react-icons/fa6";
import { VscGraphLine } from "react-icons/vsc";
import { RiAdminFill, RiLuggageDepositLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

const Component = ({ children, isAdmin = false }: { children: ReactNode; isAdmin?: boolean }) => {
	const pathname = usePathname();
	const user = useSelector(useUserSlice);
	const [showInformation, setShowInformation] = useState(false);
	const logoutUser = useLogout();

	const [showMenu, setShowMenu] = useState(false);
	return (
		<div className="w-full h-auto relative flex  bg-[#4A4445] items-stretch justify-start">
			{/* side bar */}
			<div className={`w-full fixed ${showMenu ? "" : "hidden lg:block"} bg-[#4A4445] md:w-1/2 z-[5] lg:w-1/5 h-screen lg:sticky top-0 left-0 border-r-[1px]`}>
				<div className="h-16 border-b-[1px] lg:px-3 flex items-center  px-4 justify-between">
					<Link href="/" className="w-28 h-1/2 relative">
						<Image src={LogoImage} fill alt="Logo Image" />
					</Link>
					<button className="group lg:hidden hover:bg-slate-800 p-[5px] rounded-full" onClick={() => setShowMenu(false)}>
						<MdClose className="text-2xl font-bold" />
					</button>
				</div>
				<div className="w-full p-4 h-[90vh] flex flex-col justify-between">
					{!isAdmin && (
						<nav className="w-full">
							<Link
								href="/dashboard"
								className={`${
									pathname === "/dashboard" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<IoMdMenu className="text-lg" />
								<p className="">Dashboard</p>
							</Link>

							<Link
								href="/dashboard/trades"
								className={`${
									pathname.startsWith("/dashboard/trades") ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<VscGraphLine className="text-lg" />
								<p className="">My Trades</p>
							</Link>
							<Link
								href="/dashboard/profile"
								className={`${
									pathname === "/dashboard/profile" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<MdOutlineAccountBalanceWallet className="text-lg" />
								<p className="">Account Settings</p>
							</Link>
							<Link
								href="/dashboard/withdraw"
								className={`${
									pathname === "/dashboard/withdraw" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2  hover:bg-[#5A5557] opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<CiDollar className="text-lg" />
								<p className="">Withdrawal</p>
							</Link>
							<Link
								href="/dashboard/deposit"
								className={`${
									pathname === "/dashboard/deposit" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<CiImport className="text-lg" />
								<p className="">Deposit</p>
							</Link>
							<Link
								href="/dashboard/transactions"
								className={`${
									pathname === "/dashboard/transactions" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<GoDatabase className="text-lg" />
								<p className="">Transactions</p>
							</Link>

							{user?.isAdmin && (
								<Link
									href="/admin"
									className={`${
										pathname === "/admin" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
									} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
									<RiAdminFill className="text-lg" />
									<p className="">View As Admin</p>
								</Link>
							)}
						</nav>
					)}
					{isAdmin && (
						<nav className="w-full">
							<Link
								href="/admin"
								className={`${
									pathname === "/admin" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<IoMdMenu className="text-lg" />
								<p className="">Dashboard</p>
							</Link>

							<Link
								href="/admin/trades"
								className={`${
									pathname === "/admin/trades" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<VscGraphLine className="text-lg" />
								<p className="">Trades</p>
							</Link>
							<Link
								href="/admin/deposits"
								className={`${
									pathname === "/admin/deposits" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<RiLuggageDepositLine className="text-lg" />
								<p className="">Deposits</p>
							</Link>
							<Link
								href="/admin/withdrawals"
								className={`${
									pathname === "/admin/withdrawals" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2  hover:bg-[#5A5557] opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<BiMoneyWithdraw className="text-lg" />
								<p className="">Withdrawals</p>
							</Link>
							<Link
								href="/admin/users"
								className={`${
									pathname === "/admin/users" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<FaUsers className="text-lg" />
								<p className="">Users</p>
							</Link>
							<Link
								href="/admin/transactions"
								className={`${
									pathname.startsWith("/admin/transactions") ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<GoDatabase className="text-lg" />
								<p className="">Transactions</p>
							</Link>
							<Link
								href="/dashboard"
								className={`${
									pathname === "/dashboard" ? "bg-[#5A5557]" : "hover:bg-[#5A5557]"
								} flex items-center gap-3 mb-2   opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`}>
								<FaUser className="text-lg" />
								<p className="">View As User</p>
							</Link>
						</nav>
					)}
					<button className={`flex items-center gap-3 mb-2 hover:bg-[#5A5557] opacity-50 text-sm hover:opacity-80 rounded-[5px] py-3 p-2`} onClick={() => logoutUser()}>
						<FaPowerOff className="text-lg" />
						<p className="">Sign Out</p>
					</button>
				</div>
			</div>

			<div className="w-full lg:w-4/5 min-h-screen relative">
				{/* Profile */}
				<div className="w-full h-16 border-b-[1px] flex px-4 lg:px-6 items-center justify-center py-4 bg-[#4A4445] shadow-md sticky top-0 left-0 z-[3]">
					<div className="flex items-center justify-center gap-[3px]">
						<button className="w-10 h-10 lg:hidden group rounded-full hover:bg-slate-800 flex items-center justify-center ml-auto" onClick={() => setShowMenu(true)}>
							<LuMenu className="group-hover:text-black text-xl" />
						</button>
						{user?.isAdmin && isAdmin && <p className="uppercase font-bold">Admin Section</p>}
					</div>
					<button className="w-10 h-10 group rounded-full hover:bg-slate-800 flex items-center justify-center ml-auto" onClick={() => setShowInformation(true)}>
						<FaUser className="group-hover:text-black text-xl" />
					</button>
				</div>
				<div className="w-full h-auto py-5">{children}</div>
			</div>

			{showInformation && <AccountInformation setShowInformation={setShowInformation} />}
		</div>
	);
};

const Mainpage = ({ children, isAdmin = false }: { children: ReactNode; isAdmin?: boolean }) => {
	return (
		<ProtectedRoute loginRequired={true} isAdmin={isAdmin}>
			<Component isAdmin={isAdmin}>{children}</Component>
		</ProtectedRoute>
	);
};

export default Mainpage;

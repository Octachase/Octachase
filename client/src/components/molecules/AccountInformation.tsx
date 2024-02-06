import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import createDateFromString from "@/utils/createDate";
import useLogout from "@/hooks/useLogout";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

import { MdClose, MdEdit, MdOutlineLogout } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoHelp } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

const AccountInformation = ({ setShowInformation }: { setShowInformation: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const user = useSelector(useUserSlice);
	const logoutUser = useLogout();
	return (
		<aside className="h-screen w-full md:w-1/2 lg:w-[25%] fixed top-0 right-0 bg-[#4A4445] shadow-2xl z-[4]">
			<div className="flex items-center justify-between p-4 bg-[#424764]">
				<p className="uppercase font-bold">Information</p>
				<button className="group hover:bg-slate-800 p-[5px] rounded-full" onClick={() => setShowInformation(false)}>
					<MdClose className="text-2xl font-bold" />
				</button>
			</div>

			<div className="py-4">
				<div className="w-28 h-28 relative overflow-hidden rounded-full mx-auto flex items-center justify-center border-[1px]">
					{!user?.profile && <FaUser className="group-hover:text-black text-5xl" />}

					{user?.profile && <Image src={user?.profile} fill alt="User profile" />}
				</div>

				<div className="flex w-[90%] pb-6 border-b-[1px] items-center justify-center flex-col py-4 ">
					<h3>{user?.firstname}</h3>
					<p className="opacity-40 text-sm">PROFIT - ${formatNumberIntoMoney(user?.profit)}</p>
					<p className="opacity-40 mt-2 text-sm">Joined -{createDateFromString(user?.createdAt)}</p>
				</div>

				<nav className="flex flex-col justify-center mx-auto items-center w-[90%]">
					<Link className="w-full px-2 flex items-center justify-start gap-2 text-sm opacity-40  py-3 border-y-[1px] hover:bg-[#5A5557]" href="/dashboard/profile">
						<MdEdit className="text-lg" />
						Edit Profile
					</Link>
					<Link className="w-full px-2 flex items-center justify-start gap-2 text-sm opacity-40  py-3 border-y-[1px] hover:bg-[#5A5557]" href="/dashboard/transactions">
						<AiOutlineTransaction className="text-lg" />
						View Transactions
					</Link>
					<Link className="w-full px-2 flex items-center justify-start gap-2 text-sm opacity-40  py-3 border-y-[1px] hover:bg-[#5A5557]" href="/help">
						<IoHelp className="text-lg" />
						Need help
					</Link>

					<button className="w-full px-2 flex items-center justify-start gap-2 text-sm opacity-40  py-3 border-y-[1px] hover:bg-[#5A5557]" onClick={() => logoutUser()}>
						<MdOutlineLogout className="text-lg" />
						Sign out
					</button>
				</nav>
			</div>
		</aside>
	);
};

export default AccountInformation;

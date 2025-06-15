"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";

import { useUserSlice } from "@/slices/user.slice";
import createDateFromString from "@/utils/createDate";

import Mainpage from "@/components/layouts/Mainpage";
import Profile from "@/components/pages/Profile/Profile";
import UpdateProfile from "@/components/pages/Profile/UpdateProfile";
import UpdateProfileImage from "@/components/pages/Profile/UploadProfileImage";
import ChangePassword from "@/components/pages/Profile/ChangePassword";

import { FaUser } from "react-icons/fa6";

const page = () => {
	const [active, setActive] = useState("profile");

	const user = useSelector(useUserSlice);
	return (
		<Mainpage>
			<main className="px-5">
				{/* Breadcrumb */}
				<div className="w-full h-8 mb-3 text-sm">
					<Link href={"/dashboard"} className="hover:text-breadcrumb">
						Dashboard
					</Link>{" "}
					/
					<span className="text-breadcrumb">
						{" "}
						{active === "profile" ? "Personal Information" : active === "update-profile" ? "Update Profile" : active === "update-image" ? "Update Profile Image" : "Change Password"}
					</span>
				</div>
				<section className="w-full h-auto gap-5 flex items-stretch justify-between ">
					{/* Profile Details */}
					<article className="hidden lg:block w-[30%]">
						<div className="w-full h-[280px] p-4 rounded-[5px] border-[1px] flex flex-col items-center justify-center mb-3">
							<div className="w-[120px] h-[120px] flex relative overflow-hidden items-center justify-center mb-3 border-[1px] border-slate-400 rounded-full">
								{!user?.profile && <FaUser className="text-5xl text-black opacity-40" />}

								{user?.profile && <Image src={user?.profile} fill alt="User profile" />}
							</div>
							<p className="text-2xl">{user?.firstname}</p>
							<p className="text-sm mt-[2px]">
								Joined - <span className="text-sec text-sm">{createDateFromString(user?.createdAt)}</span>{" "}
							</p>
						</div>
						<div className="w-full h-auto rounded-[5px] p-4 pb-6 border-[1px]">
							<h3 className="mb-3">CONTACT</h3>
							<div className="flex items-start gap-3">
								<p className="w-10 h-10 bg-[#4B6152] text-[#08C18D] text-xl rounded-full flex items-center justify-center">@</p>
								<div>
									<p className="text-sm font-medium">Email</p>
									<p className="text-sm opacity-40">{user?.email}</p>
								</div>
							</div>
						</div>
					</article>
					<article className="w-full md:w-[70%] h-auto">
						{/* Navigation */}
						<div className="w-full overflow-x-auto md:w-full">
							<nav className="lg:w-full w-[200%] border-[1px] p-4 flex gap-5">
								<button
									className={`uppercase ${active === "profile" ? "text-sec font-bold" : "opacity-40 hover:opacity-80 hover:text-sec"} font-normal text-sm`}
									onClick={() => setActive("profile")}>
									Profile
								</button>
								<button
									className={`uppercase ${active === "update-profile" ? "text-sec font-bold" : "opacity-40 hover:opacity-80 hover:text-sec"} font-normal text-sm`}
									onClick={() => setActive("update-profile")}>
									Update Profile
								</button>
								<button
									className={`uppercase ${active === "update-image" ? "text-sec font-bold" : "opacity-40 hover:opacity-80 hover:text-sec"} font-normal text-sm`}
									onClick={() => setActive("update-image")}>
									Upload Profile Image
								</button>
								<button
									className={`uppercase ${active === "change-password" ? "text-sec font-bold" : "opacity-40 hover:opacity-80 hover:text-sec"} font-normal text-sm`}
									onClick={() => setActive("change-password")}>
									Change Password
								</button>
							</nav>
						</div>

						<div className="border-[1px] w-full min-h-[50vh] mt-6 pb-8 rounded-[3px] px-4 py-2">
							{active === "profile" && <Profile />}
							{active === "update-profile" && <UpdateProfile />}
							{active === "update-image" && <UpdateProfileImage />}
							{active === "change-password" && <ChangePassword />}
						</div>
					</article>
				</section>
			</main>
		</Mainpage>
	);
};

export default page;

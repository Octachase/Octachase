"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import LogoImage from "@/assets/logo.svg";

const Footer = () => {
	const user = useSelector(useUserSlice);
	return (
		<footer className=" bg-cover bg-fixed lg:h-[calc(100vh-88px)] px-4 lg:px-[80px] bg-[url('/assets/footer.jpg')] pb-[90px] md:pb-0">
			{/* logo row */}
			<div className="flex justify-between pt-[50px] pb-[30px] border-b-[1px] border-neutral-600">
				<div className="w-[134px] h-[59px] relative">
					<Image src={LogoImage} fill alt="Logo Image" />
				</div>
				<div className="w-[104px] h-[56px] mr-[46px] object-cover relative">
					<Image src="/assets/ssl.png" fill alt="Logo Image" />
				</div>
			</div>
			{/* links row */}
			<div className="flex flex-col lg:flex-row  justify-between gap-x-[80px] pt-[20px] pb-[30px] border-b-[1px] border-neutral-600">
				<article className="w-full lg:w-[243px]">
					<p className="text-[12px] text-[#a9b5cb]">
						Are you looking for a stable, reliable, guaranteed weekly income?Octachase offers a range of options to make the most off your investment. Get involved to discover the power of
						trading.
					</p>
				</article>
				{/* links and contact information */}
				<div className="flex flex-col w-[570px] gap-y-[30px]">
					{/* links  */}
					<ul className="flex gap-x-[10px] items-center flex-wrap">
						<li>
							<Link href="/" className="text-[12px] hover:text-[#75ace7]">
								Home
							</Link>
						</li>
						<li className="text-[12px]">/</li>
						<li>
							<Link href="/about" className="text-[12px] hover:text-[#75ace7]">
								About us
							</Link>
						</li>
						<li className="text-[12px]">/</li>
						{!user._id && (
							<>
								<li>
									<Link href="/signup" className="text-[12px] hover:text-[#75ace7]">
										Sign up
									</Link>
								</li>
								<li className="text-[12px]">/</li>
								<li>
									<Link href="/login" className="text-[12px] hover:text-[#75ace7]">
										Login
									</Link>
								</li>
							</>
						)}
						{user._id && (
							<li>
								<Link href={user?.isAdmin ? "/admin" : "/dashboard"} className="text-[12px] hover:text-[#75ace7]">
									Dashboard
								</Link>
							</li>
						)}
						<li className="text-[12px]">/</li>
						<li>
							<Link href="/faqs" className="text-[12px] hover:text-[#75ace7]">
								FAQs
							</Link>
						</li>
					</ul>
					{/* contact information */}
					<div className="flex flex-col gap-[10px]">
						<h3 className="text-[14px] text-[#a9b5cb]">Contact Information</h3>
						<div className="flex flex-col lg:flex-row lg:items-center text-[12px]">
							<p className="text-[12px] text-[#a9b5cb]">St. Zip. Encinitas. 260-C North El Camino. Real. Encinitas. CA</p>
						</div>
						<div className="flex items-center text-[12px]">
							<Link href="mailto:support@octachase.com" className="">
								support@octachase.com
							</Link>
						</div>
					</div>
				</div>

				<article className="w-full lg:w-[243px] mt-5 lg:mt-0">
					<h3 className="text-[12px] text-[#a9b5cb]">About Octachase</h3>
					<p className="text-[12px] text-[#a9b5cb]">
						Octachase is totally different from its competitors trying to achieve something special starting with the website design, trading platform, and extremely functional.
					</p>
				</article>
			</div>
			{/* notice */}
			<article className="py-[20px]">
				<p className="text-[12px] text-[#a9b5cb]">
					RISK WARNING: The Financial Products offered by the company include Contracts for Difference ('CFDs') and other complex financial products. Trading CFDs carries a high level of
					risk since leverage can work both to your advantage and disadvantage. As a result, CFDs may not be suitable for all investors because it is possible to lose all of your invested
					capital. You should never invest money that you cannot afford to lose. Before trading in the complex financial products offered, please ensure to understand the risks involved
				</p>
			</article>
		</footer>
	);
};

export default Footer;

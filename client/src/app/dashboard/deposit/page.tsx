"use client";
import React, { useState } from "react";
import Link from "next/link";

import Deposit from "@/components/pages/Deposit/Deposit";
import Mainpage from "@/components/layouts/Mainpage";
import HowTo from "@/components/pages/Deposit/HowTo";
import PricesIframe from "@/components/atoms/PricesIframe";

import { MdCurrencyBitcoin } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";
import BalanceCard from "@/components/atoms/BalanceCard";

const page = () => {
	const [tab, setTab] = useState(1);
	return (
		<Mainpage>
			{/* Breadcrumb */}
			<div className="w-full text-sm px-5 h-8 mb-[3px]">
				<Link href={"/dashboard"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb font-medium">My Account</span>
			</div>

			<PricesIframe />
			<main className="w-full px-5">
				{/* Balance Card */}
				<BalanceCard />

				<div className="my-3 ">
					<h3 className="font-bold border-b-[1px]">MAKING A DEPOSIT</h3>

					<div className="p-3 flex items-stretch border-b-[1px] justify-between md:gap-4 lg:gap-6">
						<button className={`w-full flex items-center p-2 ${tab == 1 ? "bg-sec text-white" : "opacity-80 hover:opacity-100"} justify-start gap-[3px]`} onClick={() => setTab(1)}>
							<MdCurrencyBitcoin className="hidden md:block" />
							Pay with Bitcoin
						</button>
						<button
							className={`${tab == 2 ? "bg-sec text-white" : "opacity-80 hover:opacity-100"} text-[12px] md:text-sm w-full items-center gap-[3px] flex justify-start p-2 gap-[3px]"`}
							onClick={() => setTab(2)}>
							<AiFillBank className="hidden md:block" />
							Where can I purchase bitcoins
						</button>
					</div>

					<div className="mt-3 border-b-[1px] pb-8">
						{tab === 1 && <Deposit />}
						{tab === 2 && <HowTo />}
					</div>
					<p className="text-[12px] mt-4 opacity-40  text-center">&copy;Octachase 2022 </p>
				</div>
			</main>
		</Mainpage>
	);
};

export default page;

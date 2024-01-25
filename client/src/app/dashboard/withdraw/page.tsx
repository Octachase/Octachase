"use client";

import React, { useState } from "react";
import Link from "next/link";

import ReceiveInBitcoin from "@/components/pages/Withdraw/Bitcoin";
import Mainpage from "@/components/layouts/Mainpage";
import BankTransfer from "@/components/pages/Withdraw/BankTransfer";
import PricesIframe from "@/components/atoms/PricesIframe";

import { MdCurrencyBitcoin } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";
import BalanceCard from "@/components/atoms/BalanceCard";

const page = () => {
	const [tab, setTab] = useState(1);
	return (
		<Mainpage>
			{/* Breadcrumb */}
			<div className="w-full px-5 h-8 text-sm mb-[3px]">
				<Link href={"/dashboard"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb font-medium">My Account</span>
			</div>

			<PricesIframe />

			<main className="px-5">
				{/* Balance Card */}
				<BalanceCard />

				<div className="mt-3">
					<h3 className="font-bold">MAKING A WITHDRAWAL</h3>
					<div className="p-3 flex items-stretch border-b-[1px] justify-between lg:gap-6">
						<button className={`w-full flex items-center p-2 ${tab == 1 ? "bg-sec text-white" : "opacity-80 hover:opacity-100"} justify-start gap-[3px]`} onClick={() => setTab(1)}>
							<MdCurrencyBitcoin className="hidden md:block" />
							Receive in Bitcoin
						</button>
						<button
							className={`${tab == 2 ? "bg-sec text-white" : "opacity-80 hover:opacity-100"} w-full text-[12px] md:text-sm items-center gap-[3px] flex justify-start p-2 gap-[3px]"`}
							onClick={() => setTab(2)}>
							<AiFillBank className="hidden md:block" />
							Bank Transfer / Cashapp
						</button>
					</div>
				</div>

				<div>
					{tab === 1 && <ReceiveInBitcoin />}
					{tab === 2 && <BankTransfer />}
				</div>
			</main>
		</Mainpage>
	);
};

export default page;

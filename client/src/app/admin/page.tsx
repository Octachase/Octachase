"use client";

import React from "react";
import Link from "next/link";

import { useGetAdminMetricsQuery } from "@/apis/usersApi";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

import Mainpage from "@/components/layouts/Mainpage";
import PricesIframe from "@/components/atoms/PricesIframe";
import Loading from "@/components/atoms/Loading";

import { FaMoneyBill } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const page = () => {
	const { data, isLoading } = useGetAdminMetricsQuery();

	return (
		<Mainpage isAdmin={true}>
			{/* Breadcrumb */}
			<div className="flex flex-col lg:flex-row mb-3 items-center justify-between px-5">
				<div className="w-full lg:h-8 mb-0 text-sm">
					<Link href={"/admin"} className="opacity-40 hover:opacity-100 hover:text-breadcrumb">
						Dashboard
					</Link>
				</div>
			</div>

			<PricesIframe />

			<>
				{!isLoading && (
					<main className="px-5">
						<div className="grid grid-cols-1 lg:grid-cols-4 items-center justify-between h-auto lg:h-24 gap-4 mt-4">
							<div className="flex w-full h-full items-center justify-between bg-[#5965F9] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold">Trades Count</h3>
									<p className="text-xl lg:text-2xl mt-[3px] uppercase font-semibold">{data?.trades} </p>
								</div>
								<div>
									<VscGraphLine className="text-2xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold uppercase">Pending Deposits</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">{data?.pendingDeposits as number}</p>
								</div>
								<div>
									<RiLuggageDepositFill className="text-2xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm lg:text-[12px]  font-bold uppercase">Withdrawal Requests</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">{data?.pendingWithdrawals as number}</p>
								</div>
								<div>
									<BiMoneyWithdraw className="text-2xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div className="">
									<h3 className="text-sm font-bold uppercase">Users Count</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">{data?.totalUsers as number}</p>
								</div>
								<div>
									<FaUsers className="text-2xl" />
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-4 items-center justify-between h-auto lg:h-24 gap-4 my-4 lg:my-10">
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold uppercase">Total Deposits</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">${formatNumberIntoMoney(data?.totalDeposits as number)}</p>
								</div>

								<div>
									<RiLuggageDepositFill className="text-2xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div className="">
									<h3 className="text-sm font-bold uppercase">Withdrawals</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">${formatNumberIntoMoney(data?.totalWithdrawals as number)}</p>
								</div>
								<div>
									<BiMoneyWithdraw className="text-2xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold uppercase">Profit</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">
										${formatNumberIntoMoney((data?.totalDeposits - data?.totalWithdrawals < 0 ? 0 : data?.totalDeposits - data?.totalWithdrawals) as number)}
									</p>
								</div>
								<div>
									<FaMoneyBill className="text-2xl" />
								</div>
							</div>
						</div>

						{/* Coin Prices */}
						<div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 h-auto  mt-4">
							<div className="w-full h-32  overflow-hidden rounded-[5px] bg-[#1e222d] ">
								<iframe
									src="https://widget.coinlib.io/widget?type=chart&amp;theme=dark&amp;coin_id=859&amp;pref_coin_id=1505"
									width="100%"
									height="500px"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
									className="w-full overflow-hidden"></iframe>
							</div>
							<div className="w-full h-32  overflow-hidden rounded-[5px] bg-[#1e222d] ">
								<iframe
									src="https://widget.coinlib.io/widget?type=chart&amp;theme=dark&amp;coin_id=145&amp;pref_coin_id=1505"
									width="100%"
									height="500px"
									className="w-full overflow-hidden"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
							</div>
							<div className="w-full h-32  overflow-hidden rounded-[5px] bg-[#1e222d] ">
								<iframe
									src="https://widget.coinlib.io/widget?type=chart&amp;theme=dark&amp;coin_id=359&amp;pref_coin_id=1505"
									className="w-full overflow-hidden"
									height="500px"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
							</div>
						</div>
					</main>
				)}

				{isLoading && (
					<div className="w-full h-[60vh] flex items-center justify-center">
						<Loading />
					</div>
				)}
			</>
		</Mainpage>
	);
};

export default page;

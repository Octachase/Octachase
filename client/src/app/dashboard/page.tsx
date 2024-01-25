"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import { useGetUserMetricsQuery } from "@/apis/usersApi";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

import Mainpage from "@/components/layouts/Mainpage";
import PricesIframe from "@/components/atoms/PricesIframe";
import Loading from "@/components/atoms/Loading";

import { FaMoneyBill } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";

const page = () => {
	const { data, isLoading } = useGetUserMetricsQuery();

	const user = useSelector(useUserSlice);
	return (
		<Mainpage>
			{/* Breadcrumb */}
			<div className="flex flex-col lg:flex-row mb-3 items-center justify-between px-5">
				<div className="w-full lg:h-8 mb-0 text-sm">
					<Link href={"/dashboard"} className="opacity-40 hover:opacity-100 hover:text-breadcrumb">
						Dashboard
					</Link>{" "}
					/ <span className="opacity-100 text-breadcrumb">My Account</span> / <span className="opacity-40">Welcome! {user?.firstname}</span>
				</div>

				<p className="font-bold text-sm w-full lg:w-[200px] flex justify-start lg:items-center lg:justify-center">
					Balance : <span className="text-sec">${formatNumberIntoMoney(user?.balance)}</span>
				</p>
			</div>

			{/* <PricesIframe /> */}

			<>
				{!isLoading && (
					<main className="px-5">
						<div className="grid grid-cols-1 lg:grid-cols-4 items-center justify-between h-auto lg:h-24 gap-4 mt-4">
							<div className="flex w-full h-full items-center justify-between bg-[#5965F9] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold">Active Trade Count</h3>
									<p className="text-xl lg:text-2xl mt-[3px] uppercase font-semibold">{data?.trades} </p>
								</div>
								<div>
									<VscGraphLine className="text-2xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold uppercase">Total Deposits</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">${formatNumberIntoMoney(data?.deposits as number)}</p>
								</div>
								<div>
									<FaMoneyBill className="text-4xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div>
									<h3 className="text-sm font-bold uppercase">Profit</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">${formatNumberIntoMoney(data?.profit as number)}</p>
								</div>
								<div>
									<FaMoneyBill className="text-4xl" />
								</div>
							</div>
							<div className="flex w-full h-full items-center justify-between bg-[#17A2B8] p-6 rounded-[5px]">
								<div className="">
									<h3 className="text-sm font-bold uppercase">Withdrawals</h3>
									<p className="text-xl lg:text-2xl mt-[3px] font-semibold">${formatNumberIntoMoney(data?.withdrawals as number)}</p>
								</div>
								<div>
									<FaMoneyBill className="text-4xl" />
								</div>
							</div>
						</div>

						{/* Coin Prices */}
						<div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 h-auto  mt-4">
							<div className="w-full h-32  overflow-hidden rounded-[5px] bg-[#1e222d] ">
								<iframe
									src="https://widget.coinlib.io/widget?type=chart&amp;theme=dark&amp;coin_id=859&amp;pref_coin_id=1505"
									width="100%"
									height="100%"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
									className="w-full"></iframe>
							</div>
							<div className="w-full h-32  overflow-hidden rounded-[5px] bg-[#1e222d] ">
								<iframe
									src="https://widget.coinlib.io/widget?type=chart&amp;theme=dark&amp;coin_id=145&amp;pref_coin_id=1505"
									width="100%"
									height="100%"
									className="w-full"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
							</div>
							<div className="w-full h-32  overflow-hidden rounded-[5px] bg-[#1e222d] ">
								<iframe
									src="https://widget.coinlib.io/widget?type=chart&amp;theme=dark&amp;coin_id=359&amp;pref_coin_id=1505"
									className="w-full"
									height="100%"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
							</div>
						</div>

						{/* Graphs */}
						<section className="flex flex-col lg:flex-row items-stretch justify-between mt-6 gap-6">
							<article className=" rounded-[5px] overflow-hidden w-full lg:w-[30%] h-[54vh] lg:h-[66vh] bg-[#171B26]">
								<iframe src="https://widget.coinlib.io/widget?type=full_v2&amp;theme=dark&amp;cnt=6&amp;pref_coin_id=1505&amp;graph=yes" height="100%" width="100%"></iframe>
							</article>
							<article className="rounded-[5px] overflow-hidden overflow-x-scroll lg:overflow-x-hidden w-full lg:w-[70%] h-[45vh] lg:h-[66vh] bg-[#171B26]">
								<div className="w-[150%] lg:w-full h-full">
									<iframe
										height="100%"
										width="100%"
										src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_b766a&amp;symbol=FX%3AUSDJPY&amp;interval=1&amp;saveimage=1&amp;toolbarbg=4f4f4f&amp;studies=%5B%5D&amp;theme=Dark&amp;style=10&amp;timezone=Etc%2FUTC&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=en&amp;utm_source=google.com&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=FX%3AUSDJPY"></iframe>
								</div>
							</article>
						</section>
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

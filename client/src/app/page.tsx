"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import accounts from "@/data/accounts.json";

import Staticpage from "@/components/layouts/Staticpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import PricesIframe from "@/components/atoms/PricesIframe";
import AccountType from "@/components/molecules/AccountType";

const Component = () => {
	const user = useSelector(useUserSlice);
	return (
		<Staticpage>
			{/* Hero section */}
			<section className="w-full h-[75vh] lg:h-[calc(100vh-88px)] bg-[url('/assets/bg-about-header.jpg')] bg-cover px-4">
				<div className="flex relative overflow-hidden items-center w-full max-w-6xl mx-auto h-full">
					<div className="w-[520px] h-[361px]  absolute bottom-[-240px] ">
						<Image src="/assets/slider.png" fill alt="slider" />
					</div>
					<div className="flex flex-col gap-[20px] w-[470px] h-auto -mt-24 lg:mt-0 lg:h-[500px]">
						<h1 className="text-2xl md:text-[40px] font-medium leading-[30px] lg:leading-[50px]">RELIABLE , SIMPLE AND INNOVATIVE</h1>
						<p className="text-[16px] opacity-80 md:text-[24px] font-light">Trade Crytocurrencies ,Stock indexes, commodities and Forex with a single Forex-based platform</p>
						<PrimaryButton text={!user?._id ? "Login" : "Dashboard"} href={!user?._id ? "/login" : "/dashboard"} sx="!bg-[#52afee] rounded-[10px] w-full md:w-96" />
					</div>
				</div>
			</section>
			{/* commodities chart */}
			<section className="w-full h-[100vh] bg-[#222941]">
				<iframe
					height="100%"
					width="100%"
					src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212m%22%2C%22showChart%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22plotLineColorGrowing%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(42%2C%2046%2C%2057%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(120%2C%20123%2C%20134%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22OANDA%3ASPX500USD%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22OANDA%3ANAS100USD%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU30%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22OANDA%3AUK100GBP%22%2C%22d%22%3A%22FTSE%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22E-Mini%20S%26P%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22astroptions.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22astroptions.com%2F%22%7D"
					title="market overview TradingView widget"></iframe>
			</section>
			{/* How it works */}
			<section className="bg-[#222941] py-12 w-full h-auto">
				<div className="flex max-w-6xl mx-auto flex-col  items-center justify-center">
					<h3 className="text-[28px] mb-8 uppercase font-bold">How it works</h3>
					<div className="flex flex-col md:flex-row px-6 lg:p-12 p-12 gap-[30px] h-auto lg:h-[190px] items-center bg-[#00000026] rounded-[30px]">
						{[
							{
								title: "Deposit",
								description: "Open real account and add funds. We work with more than 20 payment systems.",
								icon: "/assets/deposit.svg",
							},
							{
								title: "Trade",
								description: "Trade any of 100 assets and stocks. Use technical analysis and trade the news.",
								icon: "/assets/choose.svg",
							},
							{
								title: "Withdraw",
								description: "Get funds easily to your bank card or e-wallet. We take no commission.",
								icon: "/assets/withdraw-small.svg",
							},
						].map((item, index) => {
							return (
								<div key={index}>
									<div className="flex mb-2 gap-[10px] items-center">
										<div className="w-[28px] h-[18px] relative">
											<Image src={item.icon} fill alt={item.title} />
										</div>
										<h5 className="text-[18px] font-bold">{item.title}</h5>
									</div>
									<p className="text-[14px] font-light">{item.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* features */}
			<section className="bg-[#222941]  py-12 w-full h-auto">
				<div className="flex flex-col max-w-6xl px-4 lg:px-24 mx-auto">
					<article className="flex gap-[3px] lg:gap-3 mb-3 items-center">
						<div className="w-12 h-8 relative">
							<Image src="/assets/features.svg" fill alt="star" />
						</div>
						<h3 className="text-2xl lg:text-4xl font-bold">Features</h3>
					</article>
					<article className="w-full flex flex-col md:flex-row gap-12 mb-10">
						<p className="basis-[50%] text-[14px]">
							We provide fastest trading using modern technologies. No delays in order executions and most accurate quotes. Our trading platform is available around the clock and on
							weekends. Astroptionss customer service is available 24/7. We are continuously adding new financial instruments.
						</p>
						<ul className="px-2 text-[14px] list-disc marker:text-[#3facff] ">
							<li>Technical analysis tools: 4 chart types, 8 indicators, trend lines</li>
							<li>Social trading: watch deals across the globe or trade with your friends</li>
							<li>Over 100 assets including popular stocks</li>
						</ul>
					</article>
					<article className="w-full flex items-center">
						<div className="w-[440px] h-[350px] relative">
							<Image src="/assets/features-1.png" fill alt="feature" />
						</div>
						<div className="w-[440px] h-[310px] relative">
							<Image src="/assets/features-2.png" fill alt="feature" />
						</div>
						<div className="w-[440px] h-[350px] relative">
							<Image src="/assets/features-3.png" fill alt="feature" />
						</div>
					</article>

					{<PrimaryButton text={"Setup your trading account"} href={!user?._id ? "/login" : "/trades"} sx="!bg-[#52afee] mx-auto rounded-[10px] lg:w-96" />}

					<p className="text-[14px] text-center my-[20px]">It only takes 40 seconds. No KYC required.</p>
				</div>
			</section>

			<section className="w-full h-[70vh] bg-[#222941]">
				<iframe
					height="100%"
					width="100%"
					src="https://www.tradingview-widget.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A400%2C%22colorTheme%22%3A%22dark%22%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22utm_source%22%3A%22astroptions.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%2C%22page-uri%22%3A%22astroptions.com%2F%22%7D"
					title="forex cross-rates TradingView widget"></iframe>
			</section>

			{/* Profits section */}
			<section className="px-4 lg:px-[88px]  bg-[url('/assets/profit-bg.jpg')] bg-cover h-auto lg:h-screen py-[50px]">
				<h2 className="text-2xl md:text-[38px] font-bold text-center">Profit from Market Ups & Downs</h2>
				<div className="flex flex-col md:flex-row gap-12 md:gap-[20px] mt-[50px]">
					<div className="px-[20px] py-[50px] bg-[rgba(0,0,0,0.6)] rounded-lg">
						<div className="w-[300px] h-[227px] relative">
							<Image src="/assets/higher-chart.svg" fill alt="feature" />
						</div>
					</div>
					<div className="flex flex-col -mt-6 lg:mt-0 gap-[30px]">
						<p className="text-[14px] leading-9 mt-3">
							Astroptionss allows you to actively trade most popular cryptocurrencies such as Bitcoin, Ethereum, Ripple, Litecoin and more, profit from market rallies and declines, or
							hedge your existing cryptocurrency holdings
						</p>
						{/* <button className="w-[200px] h-[50px]  capitalize bg-[#3facff] rounded-md text-[14px] ">Setup your trading account</button> */}
						<PrimaryButton text={"Setup your trading account"} href={user?._id ? "/login" : "/trades"} sx="!bg-[#52afee] rounded-[10px] w-72" />
					</div>
					<div className="px-[20px] py-[50px] bg-[rgba(0,0,0,0.6)] rounded-lg">
						<div className="w-[300px] h-[227px] relative">
							<Image src="/assets/lower-chart.svg" fill alt="feature" />
						</div>
					</div>
				</div>
			</section>

			{/* trading account types */}
			<section className="flex flex-col py-[50px] px-4 lg:px-[30px]  bg-[#222941]">
				<h3 className="text-[36px] text-center font-bold mb-[30px]">Our Trading Account Types</h3>
				{/* before cards */}
				<div className="w-full grid grid-cols-1 gap-6 md:gap-3 md:grid-cols-2 lg:grid-cols-4 items-center justify-between">
					{accounts.map((account, index) => (
						<AccountType key={index} {...account} />
					))}
				</div>
			</section>
			{/* We accept */}
			<div className="flex flex-col  bg-[url('/assets/slider1.jpg')] bg-fixed  bg-cover px-4 lg:px-[88px] py-[50px]">
				<h3 className="text-[36px] text-center font-bold">We accept</h3>
				<p className="text-[14px] text-center">Payment Methods for Deposit and withdrawal</p>
				<div className="flex items-center justify-between">
					{["/assets/ethereum.png", "/assets/bitcoin.png", "/assets/litecoin.png", "/assets/perfect-money.png"].map((item, index) => {
						return (
							<div key={index} className="w-[252px] h-8 lg:h-[98px] relative">
								<Image src={item} fill alt="feature" />
							</div>
						);
					})}
				</div>
			</div>
		</Staticpage>
	);
};

const page = () => {
	return (
		<>
			<Component />
			<div className="w-full bg-black">
				<PricesIframe />
			</div>
		</>
	);
};

export default page;

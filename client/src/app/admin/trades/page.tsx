"use client";

import React from "react";
import Link from "next/link";

import createDateFromString from "@/utils/createDate";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import { useGetAllTradesQuery } from "@/apis/tradesApi";

import Mainpage from "@/components/layouts/Mainpage";
import Loading from "@/components/atoms/Loading";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

const page = () => {
	const { data: trades, isFetching, error } = useGetAllTradesQuery();

	useCreateErrorFromApiRequest(error);
	return (
		<Mainpage isAdmin={true}>
			{/* Breadcrumb */}
			<div className="w-full px-5 h-8 mb-0 text-sm">
				<Link href={"/admin"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb">Trades</span>
			</div>

			<main className="px-5 ">
				<div className="my-3">
					<div className="flex items-center justify-between">
						<h3 className="uppercase font-bold">Most recent trades (Last 100)</h3>
					</div>

					{!isFetching && (
						<div className="mt-4">
							{trades?.length === 0 && <p>There is no data here</p>}
							{trades?.length > 0 && (
								<div className="w-full overflow-x-auto">
									<div className="w-[250%] md:w-[150%] lg:w-full h-auto">
										<div className="flex border-[1px] justify-between items-center">
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">STATUS</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">CREATED BY</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">AMOUNT</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">PACKAGE TYPE</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">START DATE</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">DAYS REMAINING</p>
										</div>

										<div className="min-h-20">
											{trades?.map((trade: any, index: number) => (
												<div className="w-full flex justify-between items-stretch" key={index}>
													<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">
														{trade?.status === "active" ? <AiOutlineLoading3Quarters /> : <FaCheck />}
													</p>
													<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">
														${formatNumberIntoMoney(trade?.amount)}
													</p>
													<p className="capitalize flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">
														{trade?.author?.lastname} {trade?.author?.firstname}
													</p>
													<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4 capitalize">{trade?.type}</p>
													<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">
														{createDateFromString(trade?.createdAt)}
													</p>
													<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-x-[1px] w-1/4">{trade?.remainingDays} days</p>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					)}

					{isFetching && (
						<div className="w-full h-[40vh] lg:w-1/2 flex items-center justify-center">
							<Loading />
						</div>
					)}
				</div>
			</main>
		</Mainpage>
	);
};

export default page;

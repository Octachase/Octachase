"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useLazyGetAllTransactionsQuery } from "@/apis/transactionsApi";
import createDateFromString from "@/utils/createDate";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

import Mainpage from "@/components/layouts/Mainpage";
import PricesIframe from "@/components/atoms/PricesIframe";
import Loading from "@/components/atoms/Loading";

const page = () => {
	const [type, setType] = useState("deposit");
	const [getTransactions, { data: txns, isFetching }] = useLazyGetAllTransactionsQuery();

	useEffect(() => {
		getTransactions({ type });
	}, [type]);

	return (
		<Mainpage isAdmin={true}>
			{/* Breadcrumb */}
			<div className="w-full px-5 h-8 mb-0 text-sm">
				<Link href={"/admin"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb">Transactions</span>
			</div>

			<PricesIframe />
			<main className="px-5 ">
				<div className="mt-3">
					<h3 className="uppercase font-bold">Recent Transaction History (Last 100)</h3>
					{/* Filter */}
					<div className="mt-2 flex items-center justify-start gap-2">
						<label htmlFor="type" className="opacity-40 text-sm">
							Select Type:
						</label>
						<select
							id="type"
							className="rounded-[3px] border-[1px] text-sm opacity-40 focus:outline-0 px-2 py-[2px] bg-transparent w-[200px]"
							value={type}
							onChange={(e) => setType(e.target.value)}>
							<option className="bg-transparent text-sm text-black" value="deposit">
								Deposits
							</option>
							<option className="bg-transparent text-sm text-black" value="withdrawal">
								Withdrawals
							</option>
							<option className="bg-transparent text-sm text-black" value="profit">
								Profits Added
							</option>
						</select>
					</div>

					{!isFetching && (
						<div className="mt-4">
							{txns?.length === 0 && <p>There is no data here</p>}
							{txns?.length > 0 && (
								<div className="w-full overflow-x-auto">
									<div className="w-[250%] md:w-[150%] lg:w-full h-auto">
										<div className="flex border-[1px] justify-between items-stretch">
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-[30%]">DATE</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">USER EMAIL</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">AMOUNT</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">METHOD</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-x-[1px] justify-center w-[10%]">Status</p>
										</div>

										{txns?.map((txn: any) => (
											<div className="w-full flex justify-between items-stretch" key={txn._id}>
												<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-[30%]">
													{createDateFromString(txn?.createdAt)}
												</p>
												<p className="flex border-b-[1px] items-center py-[5px] text-[12px] lowercase opacity-40 justify-center px-2 border-l-[1px] w-1/5">
													{txn?.author?.email.split("@")[0]}
												</p>
												<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/5">${formatNumberIntoMoney(txn.amount)}</p>
												<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/5">
													{txn.type === "deposit" ? "Bitcoin" : txn?.details?.method}
												</p>
												<p className="capitalize flex border-b-[1px] items-center py-[3px] text-sm opacity-40 justify-center border-x-[1px] w-[10%]">{txn.status}</p>
											</div>
										))}
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

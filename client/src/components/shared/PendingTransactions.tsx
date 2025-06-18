"use client";

import React from "react";
import Link from "next/link";

import { useGetPendingTransactionsQuery } from "@/apis/transactionsApi";
import createDateFromString from "@/utils/createDate";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

import Mainpage from "@/components/layouts/Mainpage";
import PricesIframe from "@/components/atoms/PricesIframe";
import Loading from "../atoms/Loading";

import { FaEye } from "react-icons/fa";

const PendingTransactions = ({ type }: { type: string }) => {
	const { data: txns, isFetching } = useGetPendingTransactionsQuery(type);

	return (
		<Mainpage isAdmin={true}>
			{/* Breadcrumb */}
			<div className="w-full px-5 h-8 mb-0 text-sm">
				<Link href={"/admin"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb">{type === "withdrawal" ? "Withdrawals" : "Deposits"}</span>
			</div>

			<PricesIframe />
			<main className="px-5 ">
				<div className="mt-3">
					<h3 className="uppercase font-bold">Pending {type === "withdrawal" ? "Withdrawal Requests" : "Deposits"} (Last 100)</h3>

					{!isFetching && (
						<div className="mt-4">
							{txns?.length === 0 && <p>There is no data here</p>}
							{txns?.length > 0 && (
								<div className="w-full overflow-x-auto">
									<div className="w-[250%] md:w-[150%] lg:w-full h-auto">
										<div className="flex border-[1px] justify-between items-center">
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/4">AMOUNT</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/4">METHOD</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/4">DATE</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/4">{type === "withdrawal" ? "Action" : "View"}</p>
										</div>

										{txns?.map((txn: any) => (
											<div className="w-full flex justify-between items-stretch" key={txn._id}>
												<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">${formatNumberIntoMoney(txn.amount)}</p>
												<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">
													{type === "deposit" ? "Bitcoin" : txn?.details?.method}
												</p>
												<p className="flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/4">
													{createDateFromString(txn?.createdAt)}
												</p>
												<div className=" capitalize flex border-b-[1px] items-center py-[5px] text-sm opacity-40 justify-center border-x-[1px] w-1/4">
													<Link href={`/admin/transactions/${txn._id}`} className="rounded-full flex items-center justify-center">
														{type !== "withdrawal" && <FaEye />}
														{type === "withdrawal" && (
															<>
																{txn?.fee !== 0 && <p className="w-full hover:text-sec">Moderate</p>}
																{txn?.fee === 0 && <p className="w-full hover:text-sec">Add Fees</p>}
															</>
														)}
													</Link>
												</div>
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

export default PendingTransactions;

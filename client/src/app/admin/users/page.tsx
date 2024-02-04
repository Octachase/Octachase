"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import { useLazyFetchAllUsersRequestQuery } from "@/apis/usersApi";
import createDateFromString from "@/utils/createDate";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

import Mainpage from "@/components/layouts/Mainpage";
import Loading from "@/components/atoms/Loading";

const page = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [fetchAllUsers, { data, isFetching, error }] = useLazyFetchAllUsersRequestQuery();

	const pageNumbers = useMemo(() => {
		let num = data?.totalPages || 1;
		let arr: number[] = [];
		for (let i = 0; i < num; i++) {
			arr.push(i + 1);
		}
		return arr;
	}, [data?.totalPages]);

	useEffect(() => {
		fetchAllUsers(currentPage);
	}, [currentPage]);

	useCreateErrorFromApiRequest(error);
	return (
		<Mainpage isAdmin={true}>
			{/* Breadcrumb */}
			<div className="w-full px-5 h-8 mb-0 text-sm">
				<Link href={"/admin"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb">Users</span>
			</div>

			<main className="w-full px-5 ">
				<div className="w-full mt-3">
					<h3 className="uppercase font-bold">Users On Platform</h3>

					{!isFetching && (
						<div className="w-full mt-4">
							{data?.users?.length === 0 && <p>There is no data here</p>}
							{data?.users?.length > 0 && (
								<div className="w-[100%] overflow-x-auto">
									<div className="w-[270%] !md:w-[170%] lg:w-full h-auto">
										<div className="flex border-[1px] justify-between items-stretch">
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-[35%]">EMAIL</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">PASSWORD</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">FULL NAME</p>
											<p className="flex items-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-1/5">BALANCE</p>
											<p className="flex items-center text-sm text-center font-bold opacity-50 py-2 border-l-[1px] justify-center w-[10%]">MEMBER SINCE</p>
										</div>

										<div className="min-h-20">
											{data?.users?.map((user: any) => (
												<div className="w-full flex justify-between items-stretch" key={user._id}>
													<p className="flex border-b-[1px] text-center items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-[35%]">{user?.email}</p>
													<p className="flex border-b-[1px] text-center items-center py-[5px] text-[12px] opacity-40 justify-center border-l-[1px] w-1/5">
														{user?.pText || "-"}
													</p>
													<p className="flex border-b-[1px] text-center items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/5">{`${user?.lastname} ${user?.firstname}`}</p>
													<p className="flex border-b-[1px] text-center items-center py-[5px] text-sm opacity-40 justify-center border-l-[1px] w-1/5">{`$${formatNumberIntoMoney(
														user?.balance
													)}`}</p>
													<p className="flex border-b-[1px] text-center items-center py-[5px] text-sm opacity-40 justify-center border-x-[1px] w-[10%]">
														{createDateFromString(user?.createdAt)}
													</p>
												</div>
											))}
										</div>

										{/* Pagination */}
										{data?.totalPages > 1 && (
											<div className="mt-12 flex items-center justify-center gap-2">
												{pageNumbers.map((item, index) => (
													<button
														key={index}
														className={`flex items-center w-10 h-10 ${
															item === currentPage ? "bg-sec font-bold" : "hover:bg-sec hover:font-bold"
														} justify-center p-2 text-sm rounded-full border-[1px]`}
														onClick={() => setCurrentPage(item)}>
														{item}
													</button>
												))}
											</div>
										)}
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

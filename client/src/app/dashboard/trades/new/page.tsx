"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { tradeSchema } from "@/libs/hookform";
import { usePostANewTradeMutation } from "@/apis/tradesApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setData, useUserSlice } from "@/slices/user.slice";

import Mainpage from "@/components/layouts/Mainpage";
import PricesIframe from "@/components/atoms/PricesIframe";
import BalanceCard from "@/components/atoms/BalanceCard";
import PrimaryButton from "@/components/atoms/PrimaryButton";

const page = () => {
	const { register, handleSubmit, getValues } = useSelectedPropertiesFromHookForm(tradeSchema);
	const [postNewTrade, { data, isLoading, error }] = usePostANewTradeMutation();
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(useUserSlice);

	const validateType = (amount: number, type: string) => {
		if (!["starter", "silver", "gold", "platinum"].includes(type.toLowerCase())) return false;
		if ((amount < 500 || amount > 4999) && type === "starter") return false;
		if ((amount < 1000 || amount > 9999) && type === "silver") return false;
		if ((amount < 2500 || amount > 20000) && type === "gold") return false;
		if ((amount < 15000 || amount > 50000) && type === "platinum") return false;
		return true;
	};

	const createTrade = (data: any) => {
		const { amount, type } = data;
		if (!validateType(amount, type)) {
			toast.error("Please enter an amount that matches the selected type", { autoClose: 1500 });
			return;
		}
		postNewTrade({ amount, type });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });

		setTimeout(() => {
			router.push("/dashboard/trades");
			dispatch(setData({ balance: ((user?.balance as number) - getValues()?.amount) as number }));
		}, 1500);
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<Mainpage>
			{/* Breadcrumb */}
			<div className="w-full text-sm px-5 h-8 mb-[3px]">
				<Link href={"/dashboard"} className="hover:text-breadcrumb">
					Dashboard
				</Link>{" "}
				/ <span className="text-breadcrumb font-medium">Create A New Trade</span>
			</div>

			<PricesIframe />
			<main className="w-full px-5">
				{/* Balance Card */}
				<BalanceCard />

				<div className="my-3 ">
					<div className="mt-3 border-b-[1px] pb-8">
						<div className="w-full ">
							<div className="flex flex-col items-center justify-center mt-8">
								<p className="w-full h-12 bg-[#D8EFCC] text-sm flex items-center px-4 justify-start text-[#1f5c01] font-bold">
									<span className="font-bold uppercase text-[#1f5c01]"> Create A New Trade</span>{" "}
								</p>

								<form onSubmit={handleSubmit(createTrade)} className="border-[1px] p-4 md:p-8 w-full mt-4">
									<div className="mt-2">
										<label htmlFor="type" className="text-sm opacity-80 block mb-[3px]">
											Package Type
										</label>
										<select {...register("type")} id="type" className="text-sm block w-full border-[1px] focus:outline-0 p-2 bg-[#464551]">
											<option className="text-sm" value="starter">
												Starter
											</option>
											<option className="text-sm" value="silver">
												Silver
											</option>
											<option className="text-sm" value="gold">
												Gold
											</option>
											<option className="text-sm" value="platinum">
												Platinum
											</option>
										</select>
									</div>
									<div className="mt-2">
										<label htmlFor="amount" className="text-sm opacity-80 block mb-[3px]">
											Amount in $
										</label>
										<input type="text" {...register("amount")} id="amount" className="block w-full border-[1px] focus:outline-0 p-2 bg-[#464551]" placeholder="100.00" />
									</div>

									<p className="opacity-40 text-sm mt-2">
										Don't understand how trades work?{" "}
										<Link href="/faq" className="underline text-sec opacity-100">
											Find out here
										</Link>{" "}
									</p>

									<PrimaryButton text="Create Trade" sx="!mt-4 !py-2 !px-10 !text-md !font-bold" type="submit" isLoading={isLoading} />
								</form>
							</div>
							<ToastContainer />
						</div>
					</div>
					<p className="text-[12px] mt-4 opacity-40  text-center">&copy;Octachase 2022 </p>
				</div>
			</main>
		</Mainpage>
	);
};

export default page;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { withdrawThroughBankTransferSchema } from "@/libs/hookform";
import { usePostANewWithdrawalRequestMutation } from "@/apis/transactionsApi";
import { setData, useUserSlice } from "@/slices/user.slice";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const BankTransfer = () => {
	const [method, setMethod] = useState("bank");
	const { register, handleSubmit, reset, getValues } = useSelectedPropertiesFromHookForm(withdrawThroughBankTransferSchema);
	const [postNewWithdrawalRequest, { data, error, isLoading }] = usePostANewWithdrawalRequestMutation();
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(useUserSlice);

	const createNewWithdrawal = (data: any) => {
		const { accountNumber, tag, login, password, accountName, amount } = data;
		if (method === "bank" && (!accountNumber || !accountName || !amount)) {
			toast.error("Please provide all required information", { autoClose: 1500 });
			return;
		}
		if (method === "cashapp" && (!tag || !amount)) {
			toast.error("Please provide all required information", { autoClose: 1500 });
			return;
		}

		postNewWithdrawalRequest({ amount, tag, accountNumber, details: { accountName, method: method === "bank" ? "Bank Transfer" : "Cashapp", login, password } });
	};

	useEffect(() => {
		if (!data) return;

		toast.success(data?.message, { autoClose: 1500 });
		dispatch(setData({ profit: user.profit - getValues().amount }));
		setTimeout(() => {
			router.push("/dashboard/transactions");
		}, 1000);
	}, [data]);

	useEffect(() => {
		reset({ tag: "", password: "", login: "", accountName: "", accountNumber: "", amount: "" });
	}, [reset]);
	return (
		<form className="mt-3" onSubmit={handleSubmit(createNewWithdrawal)}>
			<p className="italic opacity-40 text-sm">Enter your account details to receive payment!</p>

			<div className="mt-2">
				<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
					Select Method
				</label>
				<select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0">
					<option value="bank">Bank Transfer</option>
					<option value="cashapp">Cashapp</option>
				</select>
			</div>

			{method === "bank" && (
				<>
					<div className="mt-2">
						<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
							Account Name
						</label>
						<input type="text" {...register("accountName")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="Account Name" />
					</div>

					<div className="mt-2">
						<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
							Account Number
						</label>
						<input type="text" {...register("accountNumber")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="Account Number" />
					</div>
				</>
			)}

			{method === "cashapp" && (
				<div className="mt-2">
					<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
						Cashapp Tag
					</label>
					<input type="text" {...register("tag")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="Cashapp Tag" />
				</div>
			)}

			<div className="mt-4">
				<p className="text-sm font-bold block mb-[3px]">Link Your Social Account</p>

				<div className="mt-2">
					<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
						Facebook/instagram Username
					</label>
					<input type="text" {...register("login")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="login access" />
				</div>

				<div className="mt-2">
					<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
						Password
					</label>
					<input type="text" {...register("password")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="login password" />
				</div>
				<div className="mt-2">
					<label htmlFor="" className="text-sm font-medium block mb-[3px]">
						Amount In USD
					</label>
					<div className="flex items-stretch justify-between">
						<div className="w-[60px] flex justify-center items-center bg-[#5C5758] font-bold text-sm opacity-60 py-2">USD</div>
						<input type="text" {...register("amount")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="0.00" />
					</div>
				</div>
				<PrimaryButton text="Submit" sx="mt-6" isLoading={isLoading} type="submit" />
			</div>
			<ToastContainer />
		</form>
	);
};

export default BankTransfer;

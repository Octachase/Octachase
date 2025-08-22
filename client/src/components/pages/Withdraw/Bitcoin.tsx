import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { usePostANewWithdrawalRequestMutation } from "@/apis/transactionsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import { setData, useUserSlice } from "@/slices/user.slice";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { withdrawThroughBTCSchema } from "@/libs/hookform";

import PrimaryButton from "@/components/atoms/PrimaryButton";

const Bitcoin = () => {
	const { register, handleSubmit, getValues } = useSelectedPropertiesFromHookForm(withdrawThroughBTCSchema);
	const [postNewWithdrawalRequest, { data, error, isLoading }] = usePostANewWithdrawalRequestMutation();
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(useUserSlice);

	const createNewWithdrawal = (data: any) => {
		const { login, password, amount, address } = data;
		postNewWithdrawalRequest({ details: { password, login, method: "Bitcoin" }, amount, address });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data?.message, { autoClose: 1500 });
		dispatch(setData({ profit: user.profit - getValues().amount }));
		setTimeout(() => {
			router.push("/dashboard/transactions");
		}, 1000);
	}, [data]);
	useCreateErrorFromApiRequest(error);
	return (
		<form onSubmit={handleSubmit(createNewWithdrawal)} className="mt-3">
			<label htmlFor="method" className="font-medium mb-[2px] text-sm">
				Method Of Withdrawal
			</label>
			<div className="px-2 w-full block disabled border-[1px] bg-[#464551] text-sm py-2 focus: coutline-0">
				<p>Bitcoin</p>
			</div>

			<div className="mt-2">
				<label htmlFor="" className="text-sm opacity-90 block mb-[3px]">
					Bitcoin Address
				</label>
				<input type="text" {...register("address")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="1737pPDDexXXNAXtR8S5hfgaUejYXuShHF" />
			</div>

			<div className="mt-2">
				<label htmlFor="" className="text-sm font-medium block mb-[3px]">
					Amount In USD
				</label>
				<div className="flex items-stretch justify-between">
					<div className="w-[60px] flex justify-center items-center bg-[#5C5758] font-bold text-sm opacity-60 py-2">USD</div>
					<input type="text" {...register("amount")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-l-[0px] border-[1px] focus:outline-0" placeholder="0.00" />
				</div>
			</div>

			<div className="mt-4">
				<p className="text-sm font-bold block mb-[3px]">Link Your Social</p>
				<input type="text" {...register("login")} className="w-full px-3 bg-[#464551] font-medium text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="facebook/instagram username" />
				<input type="text" {...register("password")} className="w-full px-3 bg-[#464551] mt-4 font-medium text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="password" />

				<PrimaryButton text="Submit" sx="mt-6" type="submit" isLoading={isLoading} />
			</div>
			<ToastContainer />
		</form>
	);
};

export default Bitcoin;

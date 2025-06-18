"use client";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect } from "react";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { useAddProfitToUserRequestMutation, useFetchAllUsersNoPagesRequestQuery } from "@/apis/usersApi";
import { addProfitSchema } from "@/libs/hookform";

import Mainpage from "@/components/layouts/Mainpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

const page = () => {
	const { data: users } = useFetchAllUsersNoPagesRequestQuery();
	const { register, handleSubmit, reset } = useSelectedPropertiesFromHookForm(addProfitSchema);
	const [addProfitRequest, { data, error, isLoading }] = useAddProfitToUserRequestMutation();

	const addProfit = (data: any) => {
		const { user, amount } = data;
		addProfitRequest({ user, amount });
	};

	useCreateErrorFromApiRequest(error);

	useEffect(() => {
		if (!data) return;
		toast.success("Profit has been successfully added to user's dashboard", { autoClose: 1500 });
		reset();
	}, [data]);

	return (
		<Mainpage isAdmin={true}>
			<div className="p-5">
				<h3 className="mb-4 uppercase font-bold">Add profit to a user's account</h3>
				<form action="" className="w-1/2" onSubmit={handleSubmit(addProfit)}>
					<select {...register("user")} id="" className="border-[1px] p-2 mb-4 block bg-transparent w-full">
						<option value="" className="!text-black" disabled>
							Select A User
						</option>
						{users?.map((user: any, index: number) => (
							<option value={user._id} key={index} className="!text-black">
								{user?.firstname} {user?.lastname} - {user?.email}
							</option>
						))}
					</select>
					<div className="mb-6">
						<label htmlFor="amount" className="block mb-[2px]">
							Please enter an amount to add to profit
						</label>
						<input type="text" id="amount" {...register("amount")} className="w-full px-3 bg-[#464551] text-sm h-auto py-2 border-[1px] focus:outline-0" placeholder="0.00" />
					</div>
					<PrimaryButton text="Continue" type="submit" isLoading={isLoading} disabled={isLoading} />
				</form>
			</div>
			<ToastContainer />
		</Mainpage>
	);
};

export default page;

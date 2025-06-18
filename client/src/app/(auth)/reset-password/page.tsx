"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { resetPasswordSchema } from "@/libs/hookform";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import { useRequestPasswordResetRequestMutation } from "@/apis/authApi";

import Staticpage from "@/components/layouts/Staticpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import ContactsCard from "@/components/molecules/ContactsCard";

const page = () => {
	const { register, reset, handleSubmit } = useSelectedPropertiesFromHookForm(resetPasswordSchema);
	const [resetPasswordRequest, { data, isLoading, error }] = useRequestPasswordResetRequestMutation();

	const resetPassword = (data: any) => {
		const { email } = data;
		resetPasswordRequest({ email });
	};

	useEffect(() => {
		if (!data) return;
		// Show success message
		toast.success(data.message, { autoClose: 1500 });
		reset();
	}, [data]);

	useCreateErrorFromApiRequest(error);

	return (
		<Staticpage auth={true}>
			<div className="h-[70vh] flex justify-center items-center shadow-2xl p-2 bg-cover bg-[url('/assets/footer.jpg')]">
				<form className="flex flex-col p-6 lg:p-[42px] bg-[url('/assets/login-bg.jpg')] bg-cover  shadow-md w-[500px] h-[328px] rounded-lg" onSubmit={handleSubmit(resetPassword)}>
					<h2 className="text-[24px] mb-[20px]">Reset Password</h2>
					<p className="text-[14px]">Please enter your email address. We will send you a link to change the password.</p>

					<div className="relative h-11 w-full min-w-[200px] my-[20px]">
						<input
							{...register("email")}
							placeholder="Enter your registered email"
							className="peer h-full w-full border-b border-blue-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-500 focus:border-[#52afee] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>
						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#52afee] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#52afee] peer-focus:after:scale-x-100 peer-focus:after:border-[#52afee] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Enter Email
						</label>
					</div>

					<PrimaryButton text="Submit" type="submit" sx="!w-[160px] mt-5 mx-auto" isLoading={isLoading} />
				</form>
			</div>

			<ContactsCard />

			<ToastContainer />
		</Staticpage>
	);
};

export default page;

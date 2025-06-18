"use client";
import Staticpage from "@/components/layouts/Staticpage";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { registerSchema } from "@/libs/hookform";
import { useRegisterUserRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import ContactsCard from "@/components/molecules/ContactsCard";

const page = () => {
	const { register, handleSubmit, reset } = useSelectedPropertiesFromHookForm(registerSchema);
	const [createAccountRequest, { data, error, isLoading }] = useRegisterUserRequestMutation();

	const createAccount = (data: any) => {
		const { firstname, lastname, email, password } = data;
		createAccountRequest({ firstname, lastname, email, password });
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
			<div className="w-full h-[70vh] flex justify-center items-center shadow-2xl bg-cover bg-[url('/assets/footer.jpg')] px-2">
				<form className="w-full flex flex-col p-5 lg:p-[42px]  bg-[url('/assets/login-bg.jpg')] bg-cover  shadow-md lg:w-[500px] h-auto rounded-lg" onSubmit={handleSubmit(createAccount)}>
					<h2 className="text-[24px] mb-[20px]">Register</h2>
					<div className="flex flex-col md:flex-row gap-0 lg:gap-[20px]">
						<div className="relative h-11 w-full min-w-[200px] mb-[20px]">
							<input
								placeholder="Enter your First Name"
								{...register("firstname")}
								className="peer h-full w-full border-b border-blue-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-500 focus:border-[#52afee] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
							/>
							<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#52afee] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#52afee] peer-focus:after:scale-x-100 peer-focus:after:border-[#52afee] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								First Name
							</label>
						</div>
						<div className="relative h-11 w-full min-w-[200px] mb-[20px]">
							<input
								placeholder="Enter your Last Name"
								{...register("lastname")}
								className="peer h-full w-full border-b border-blue-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-500 focus:border-[#52afee] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
							/>
							<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#52afee] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#52afee] peer-focus:after:scale-x-100 peer-focus:after:border-[#52afee] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								Last Name
							</label>
						</div>
					</div>
					<div className="relative h-11 w-full min-w-[200px] mb-[20px]">
						<input
							{...register("email")}
							placeholder="Enter your registered email"
							className="peer h-full w-full border-b border-blue-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-500 focus:border-[#52afee] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>
						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#52afee] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#52afee] peer-focus:after:scale-x-100 peer-focus:after:border-[#52afee] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Enter Email
						</label>
					</div>
					<div className="relative h-11 mb-4 w-full min-w-[200px]">
						<input
							{...register("password")}
							type="password"
							placeholder="Enter valid password"
							className="peer h-full w-full border-b border-blue-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-gray-500 focus:border-[#52afee] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						/>
						<label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#52afee] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#52afee] peer-focus:after:scale-x-100 peer-focus:after:border-[#52afee] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Secure Password
						</label>
					</div>
					<PrimaryButton text="Register" type="submit" isLoading={isLoading} sx="mb-5" />

					<Link href="/login" className="text-center text-[14px] text-[#52afee]">
						Login
					</Link>
				</form>
			</div>
			<ContactsCard />
			<ToastContainer />
		</Staticpage>
	);
};

export default page;

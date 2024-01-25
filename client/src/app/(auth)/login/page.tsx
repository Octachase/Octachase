"use client";
import Staticpage from "@/components/layouts/Staticpage";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { loginSchema } from "@/libs/hookform";
import { useLoginRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import { setCookie } from "@/utils/cookies";
import { setData } from "@/slices/user.slice";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import ContactsCard from "@/components/molecules/ContactsCard";

const page = () => {
	const { register, reset, handleSubmit } = useSelectedPropertiesFromHookForm(loginSchema);
	const [loginRequest, { data, isLoading, error }] = useLoginRequestMutation();
	const dispatch = useDispatch();

	const loginUser = (data: any) => {
		const { email, password } = data;
		loginRequest({ email, password });
	};

	useEffect(() => {
		if (!data) return;

		toast.success("Login was successful", { autoClose: 1500 });
		// Create cookie
		setCookie("login", data?.token, 30);

		setTimeout(() => {
			// Set Dispatch
			dispatch(setData(data.user));
		}, 500);
	}, [data]);
	useCreateErrorFromApiRequest(error);

	return (
		<Staticpage auth={true}>
			<div className="h-[70vh] flex justify-center items-center shadow-2xl bg-cover bg-[url('/assets/footer.jpg')]">
				<form className="flex flex-col p-4 lg:p-[42px] bg-[url('/assets/login-bg.jpg')] bg-cover  shadow-md w-[500px] h-auto rounded-lg" onSubmit={handleSubmit(loginUser)}>
					<h2 className="text-[24px] mb-[20px]">Sign In</h2>

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
					<div className="relative h-11  w-full min-w-[200px]">
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
					<PrimaryButton text="LOG IN" isLoading={isLoading} type="submit" sx="my-5" />
					<Link href="/reset-password" className="text-center mb-3 text-[14px] text-[#52afee]">
						Forgotten password
					</Link>
					<Link href="/signup" className="text-center text-[14px] text-[#52afee]">
						Register
					</Link>
				</form>
			</div>
			<ContactsCard />
			<ToastContainer />
		</Staticpage>
	);
};

export default page;

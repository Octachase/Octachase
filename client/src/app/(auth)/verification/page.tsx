"use client";
import Staticpage from "@/components/layouts/Staticpage";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { setPasswordSchema } from "@/libs/hookform";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

import PrimaryButton from "@/components/atoms/PrimaryButton";

import { FaHeadset } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { useVerifyUserEmailRequestMutation } from "@/apis/authApi";
import ContactsCard from "@/components/molecules/ContactsCard";

const page = () => {
	const [verifyAccountRequest, { data, isLoading, error }] = useVerifyUserEmailRequestMutation();
	const searchParams = useSearchParams();
	const jwt = searchParams.get("jwt");
	const router = useRouter();

	useEffect(() => {
		if (!jwt) router.replace("/login");
	}, [jwt]);

	const verifyAccount = () => {
		verifyAccountRequest({ token: jwt as string });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });

		setTimeout(() => {
			router.replace("/login");
		}, 1500);
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<Staticpage>
			<div className="h-[70vh] flex justify-center items-center p-2 shadow-2xl bg-cover bg-[url('/assets/footer.jpg')]">
				<form className="flex flex-col p-6 lg:p-[42px] bg-[url('/assets/login-bg.jpg')] bg-cover  shadow-md w-[500px] h-[328px] rounded-lg">
					<h2 className="text-[24px] mb-[20px]">Verification</h2>
					<p>A verification link has been sent to your email</p>
					<PrimaryButton text="Verify" sx="!w-[160px] mt-5" handleClick={verifyAccount} isLoading={isLoading} />
				</form>
			</div>
			<ContactsCard />
			<ToastContainer />
		</Staticpage>
	);
};

export default page;

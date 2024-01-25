"use client";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

import { contactSchema } from "@/libs/hookform";
import { usePostANewContactMessageMutation } from "@/apis/contactsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";

import Staticpage from "@/components/layouts/Staticpage";
import PrimaryButton from "@/components/atoms/PrimaryButton";

import { FaHome } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
// asset

export default function Home() {
	const { register, reset, handleSubmit } = useSelectedPropertiesFromHookForm(contactSchema);
	const [postAContactRequest, { data, error, isLoading }] = usePostANewContactMessageMutation();

	const postAContact = (data: any) => {
		const { name, email, message, type } = data;
		postAContactRequest({ name, email, message, type });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });
		reset();
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<Staticpage>
			<div className="w-full h-auto relative flex flex-col bg-[url('/assets/bg-contact.jpg')]">
				<div className="w-full lg:h-[574px] flex flex-col lg:justify-end bg-header-bg">
					<h1 className="text-[32px] font-light w-full bg-transparent pt-[150px] pb-[50px] pl-4 mt-3 lg:pl-[200px]">Contact Us</h1>
					<div className="flex  flex-col lg:flex-row gap-12   w-full bg-[#222941] p-4 lg:p-[30px] ">
						<form action="" className=" flex flex-col gap-[20px] lg:m-[20px] w-full lg:w-[600px]" onSubmit={handleSubmit(postAContact)}>
							<select {...register("type")} className="h-[40px] rounded-md text-[14px] text-black placeholder:text-[14px]">
								<option value="trading" className="bg-sec">
									Trading question
								</option>
								<option value="financial" className="bg-sec">
									Financial question
								</option>
								<option value="technical" className="bg-sec">
									Technical question
								</option>
							</select>
							<div className="flex items-center gap-[20px]">
								<input {...register("name")} type="text" className="h-[40px] text-black w-full rounded-md px-[10px] placeholder:text-[14px]" placeholder="Your Name" />

								<input {...register("email")} type="email" className="h-[40px] text-black w-full rounded-md px-[10px] placeholder:text-[14px]" placeholder="Your Email Address" />
							</div>
							<textarea {...register("message")} className="rounded-md text-black p-[10px]  placeholder:text-[14px]" placeholder="Message" />

							<PrimaryButton text="Submit" sx="!w-[160px]" isLoading={isLoading} type="submit" />
						</form>
						<div className="flex flex-col justify-center pb-8  gap-[30px]">
							<div className="flex gap-x-4 items-center">
								<FaHome className="w-8 h-8 lg:w-[48px] lg:h-[48px]" />
								<div className="flex flex-col">
									<h3 className="text-[14px] font-bold">ADDRESS:</h3>
									<p className="text-[14px]">St. Zip. Encinitas. 260-C North El Camino. Real. Encinitas. CA</p>
								</div>
							</div>
							<div className="flex gap-x-4 items-center">
								<IoMdMail className="w-8 h-8 lg:w-[48px] lg:h-[48px]" />
								<div className="flex flex-col">
									<h3 className="text-[14px] font-bold">EMAIL ADDRESS:</h3>
									<a href="emailto:support@octachase.com" className="text-[14px]">
										support@octachase.com
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</Staticpage>
	);
}

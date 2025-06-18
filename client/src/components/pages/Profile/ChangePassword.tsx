import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { changePasswordSchema } from "@/libs/hookform";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useUpdateUserPasswordRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

const ChangePassword = () => {
	const { register, reset, handleSubmit } = useSelectedPropertiesFromHookForm(changePasswordSchema);
	const [changePasswordRequest, { data, error, isLoading }] = useUpdateUserPasswordRequestMutation();

	const changePassword = (data: any) => {
		const { oldpassword, newpassword, confirmpassword } = data;
		if (newpassword !== confirmpassword) {
			toast.error("Make sure the new passwords match each other", { autoClose: 1500 });
			return;
		}
		changePasswordRequest({ oldpassword, newpassword });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });
		reset();
	}, [data]);
	useCreateErrorFromApiRequest(error);
	return (
		<div>
			<div className="w-full border-b-[1px] py-2 text-text">
				<p className="font-bold uppercase">Change Password</p>
			</div>
			<form className="mt-3" onSubmit={handleSubmit(changePassword)}>
				<div className="w-full mb-3 ">
					<label htmlFor="password" className="text-sm text-white mb-[2px] block">
						Old Password
					</label>
					<input type="password" {...register("oldpassword")} className="block border-[1px] bg-[#464551]  focus:outline-0 px-2 w-full py-3 text-sm" id="password" />
				</div>
				<div className="w-full mb-3 ">
					<label htmlFor="newpassword" className="text-sm text-white mb-[2px] block">
						New Password
					</label>
					<input type="password" {...register("newpassword")} className="block border-[1px] bg-[#464551]  focus:outline-0 px-2 w-full py-3 text-sm" id="newpassword" />
				</div>
				<div className="w-full ">
					<label htmlFor="confirmpassword" className="text-sm text-white mb-[2px] block">
						Repeat New Password
					</label>
					<input type="password" {...register("confirmpassword")} className="block border-[1px] bg-[#464551]  focus:outline-0 px-2 w-full py-3 text-sm" id="confirmpassword" />
				</div>
				<p className="text-sm mt-[2px]">Hint :The password should be at least eight characters long. </p>

				<PrimaryButton text="Change Password" sx="!mt-4 !px-16" type="submit" isLoading={isLoading} />
				<ToastContainer />
			</form>
		</div>
	);
};

export default ChangePassword;

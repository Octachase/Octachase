import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { updateProfileSchema } from "@/libs/hookform";
import { setData, useUserSlice } from "@/slices/user.slice";
import { useUpdateUserProfileRequestMutation } from "@/apis/usersApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

import PrimaryButton from "@/components/atoms/PrimaryButton";

const UpdateProfile = () => {
	const user = useSelector(useUserSlice);
	const [updateUserProfile, { data, error, isLoading }] = useUpdateUserProfileRequestMutation();
	const { register, reset, handleSubmit, getValues } = useSelectedPropertiesFromHookForm(updateProfileSchema);
	const dispatch = useDispatch();

	const updateUser = (data: any) => {
		const { firstname, lastname } = data;
		updateUserProfile({ firstname, lastname });
	};

	useEffect(() => {
		reset({ firstname: user?.firstname, lastname: user?.lastname });
	}, []);

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });
		const { firstname, lastname } = getValues();
		reset({});
		dispatch(setData({ firstname, lastname }));
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<div>
			<div className="w-full border-b-[1px] py-2 text-text">
				<p className="font-bold uppercase">Update Profile</p>
			</div>
			<form className="mt-6" onSubmit={handleSubmit(updateUser)}>
				<div className="w-full mb-3 ">
					<label htmlFor="fullname" className="text-sm mb-[2px] block">
						First Name
					</label>
					<input type="text" {...register("firstname")} className="bg-[#464551] block border-[1px] focus:outline-0 px-2 w-full py-2 text-sm" id="firstname" />
				</div>
				<div className="w-full mb-3 ">
					<label htmlFor="lastname" className="text-sm mb-[2px] block">
						Last Name
					</label>
					<input type="text" {...register("lastname")} className="bg-[#464551] block border-[1px] focus:outline-0 px-2 w-full py-2 text-sm" id="lastname" />
				</div>
				<div className="w-full mb-3 ">
					<p className="text-[15px] rounded-[5px] mb-[2px] block">Email Address</p>
					<p className="block text-sm bg-slate-600  text-white border-[1px] focus:outline-0 px-2 w-full py-2 " id="fullname">
						{user?.email}
					</p>
				</div>

				<PrimaryButton text="Update Profile" sx="!mt-4" type="submit" isLoading={isLoading} />
			</form>
			<ToastContainer />
		</div>
	);
};

export default UpdateProfile;

import React, { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import compressImage from "@/utils/compressImage";
import { useUpdateUserProfileImageRequestMutation } from "@/apis/usersApi";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import { setData } from "@/slices/user.slice";

const UpdateProfileImage = () => {
	const imageRef = useRef<null | HTMLInputElement>(null);
	const [updateProfileImageRequest, { data, error, isLoading }] = useUpdateUserProfileImageRequestMutation();
	const dispatch = useDispatch();

	const updateProfileImage = async (e: any) => {
		e.preventDefault();
		const files = imageRef?.current?.files;
		if (!files || files?.length === 0) {
			// Toast to alert user to upload new profile
			toast.error("Please upload a profile image", { autoClose: 1500 });
			return;
		}
		const compressedFile = await compressImage(files[0]);
		// Update profile image
		updateProfileImageRequest({ file: compressedFile });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("The profile image was successfully updated", { autoClose: 1500 });

		// Stor url im redux
		dispatch(setData({ profile: data?.url }));
		if (imageRef?.current?.value) imageRef.current.value = "";
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<div>
			<div className="w-full border-b-[1px] py-2 text-text">
				<p className="font-bold uppercase">Update Profile Image</p>
			</div>
			<form onSubmit={updateProfileImage} className="mt-6">
				<div className="w-full mb-3 ">
					<input type="file" accept="image/*" ref={imageRef} className="block border-[1px] focus:outline-0 px-2 w-full py-3 text-sm rounded-[5px]" id="fullname" />
				</div>

				<PrimaryButton text="Update Profile Image" sx="!mt-4" type="submit" isLoading={isLoading} />
			</form>
			<ToastContainer />
		</div>
	);
};

export default UpdateProfileImage;

import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// import { useGetUserMetricsQuery } from "@/apis/usersApi";
// import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import { useUserSlice } from "@/slices/user.slice";
import createDateFromString from "@/utils/createDate";

const Profile = () => {
	// Get User Metrics
	// const { data, error, isLoading } = useGetUserMetricsQuery();
	const user = useSelector(useUserSlice);

	// useCreateErrorFromApiRequest(error);
	return (
		<div className="">
			<h3 className="uppercase text-md font-bold py-2">Profile</h3>

			<div className=" w-full h-auto">
				<div className="border-b-[1px] p-3">
					<p className="text-[13px] opacity-80">
						Currency: <span className="opacity-100">$</span>
					</p>
				</div>
				<div className="border-b-[1px] p-3">
					<p className="text-[13px] opacity-80">Date Joined:</p>
					<p className="opacity-100">{createDateFromString(user?.createdAt)}</p>
				</div>
				<div className="border-b-[1px] p-3">
					<p className="text-[13px] opacity-80">Capital:</p>
					<p className="opacity-100 text-sm">$ 0</p>
				</div>
				<div className="border-b-[1px] p-3">
					<p className="text-[13px] opacity-80">Profit:</p>
					<p className="opacity-100 text-sm">$ 0</p>
				</div>
				<div className="p-3 pb-0">
					<p className="text-[13px] opacity-80">Net Balance:</p>
					<p className="opacity-100 text-sm">$ 0</p>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Profile;

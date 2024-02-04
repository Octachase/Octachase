import React, { useState } from "react";

import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";
import PrimaryButton from "../atoms/PrimaryButton";
import { useSelector } from "react-redux";
import { useUserSlice } from "@/slices/user.slice";

const AccountType = ({ name, percentage, min, max, days }: { min: number; max: number; percentage: string; name: string; days: string }) => {
	const [value, setValue] = useState(Math.floor((min + max) / 2));
	const user = useSelector(useUserSlice);
	return (
		<div className="flex flex-col w-full rounded-2xl overflow-clip">
			<div className="bg-[#52AFEE] py-[20px]">
				<h5 className="text-center text-2xl font-medium">{name}</h5>
			</div>
			<div className="flex flex-col gap-3 p-[20px] bg-[#191f31] ">
				<p className="text-[16px] uppercase text-sec text-center">
					Return after <span className="text-white">{days} days</span>
				</p>
				<hr className="h-[1px] bg-white" />
				<p className="text-[16px] text-white text-center">
					Compounding <span className="text-sec">total of</span> {percentage}%
				</p>
				<hr className="h-[1px] bg-white" />
				<p className="text-[16px] uppercase text-sec text-center">
					Hashing for <span className="text-white">{days} days</span>
				</p>
				<hr className="h-[1px] bg-white" />
				<div className="flex items-center justify-between">
					<div className="flex flex-col text-center font-bold">
						<p className="text-[14px] uppercase">Minimum</p>
						<p className="text-[14px] text-sec font-bold">${min}</p>
					</div>
					<div className="flex flex-col text-center font-bold">
						<p className="text-[14px] uppercase">maximum</p>
						<p className="text-[14px] text-sec font-bold">${max}</p>
					</div>
				</div>
				<p className="text-[14px] text-center ">${formatNumberIntoMoney(value)}</p>
				<input type="range" name="amount" value={value} id="amount" min={min} max={max} className="range pr-6 accent-sec" onChange={(e) => setValue(+e.target.value)} />

				{/* <ProgressBar /> */}
				{!user.isAdmin && <PrimaryButton text={!user?._id ? "Sign up" : "Trade"} href={!user?._id ? "/signup" : "/dashboard/trades/new"} sx="rounded-[5px] bg-[#52AFEE] !py-3" />}
			</div>
		</div>
	);
};

export default AccountType;

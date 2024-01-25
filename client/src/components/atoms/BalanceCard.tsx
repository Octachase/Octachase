import React from "react";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";

import { FaMoneyBill } from "react-icons/fa6";
import formatNumberIntoMoney from "@/utils/formatNumberIntoMoney";

const BalanceCard = () => {
	const user = useSelector(useUserSlice);
	return (
		<article className="w-[250px]  h-auto bg-[#FF5959] text-white p-4 rounded-[2px] mt-3 flex items-center justify-between">
			<div>
				<h3 className="font-bold">NET BALANCE</h3>
				<p className="text-xl md:text-2xl mt-2 font-semibold">${formatNumberIntoMoney(user?.balance)}</p>
			</div>
			<div>
				<FaMoneyBill className="text-4xl" />
			</div>
		</article>
	);
};

export default BalanceCard;

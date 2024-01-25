import React from "react";
import Link from "next/link";

import { FaHeadset } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";

const ContactsCard = () => {
	return (
		<div className="flex flex-col md:flex-row lg:items-center gap-6 lg:gap-4 p-4 lg:px-[80px] py-[40px] justify-between bg-[#222941]">
			<div className="flex gap-4 lg:gap-2  lg:flex-col items-center lg:w-[350px]">
				<FaHeadset className="w-8 h-8 lg:h-[87px] lg:w-[87px]" /> <p className="text-[14px]">24/7 Customer Support</p>
			</div>
			<div className="flex gap-4 lg:gap-2  lg:flex-col items-center  w-[350px]">
				<MdEmail className="w-8 h-8 lg:h-[87px] lg:w-[87px]" />
				<Link href="emailto:support@octachase.com" className="text-[14px]">
					support@octachase.com
				</Link>
			</div>
			<div className="flex gap-4 lg:gap-2  lg:flex-col items-center  w-[350px]">
				<IoIosChatbubbles className="w-8 h-8 lg:h-[87px] lg:w-[87px]" /> <p className="text-[14px]">Friendly Support Ticket</p>
			</div>
		</div>
	);
};

export default ContactsCard;

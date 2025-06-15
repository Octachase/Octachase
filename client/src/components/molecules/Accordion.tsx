"use client";
import React, { useState } from "react";

import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

const Accordion = ({ question, answer }: { question: string; answer: string; height?: number }) => {
	const [show, setShow] = useState(false);
	return (
		<div className="w-full overflow-hidden">
			<button className="w-full p-4 flex items-center  gap-2 h-auto border-b-[1px] border-[rgba(0,0,0,.125)]" onClick={() => setShow((prev) => !prev)}>
				<div className="w-8 h-8 flex items-center justify-center opacity-40">{!show ? <IoChevronDownSharp /> : <IoChevronUpSharp />}</div>
				<p className="w-full text-left text-sm lg:text-[16px] text-sec ">{question}</p>
			</button>
			<div className={`w-full bg-[#1D2337] border-b-[1px]  text-sm transition-all border-[rgba(0,0,0,.125)] duration-200 overflow-hidden px-12 font-light ${show ? `py-4` : "h-0"}`}>
				{answer}
			</div>
		</div>
	);
};

export default Accordion;

// BrightenUpDots.js

import React, { useState, useEffect } from "react";

const Loading = ({ sx = "" }: { sx?: string }) => {
	const [activeDot, setActiveDot] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveDot((prevDot) => (prevDot + 1) % 3);
		}, 1000);

		return () => clearInterval(interval); // Cleanup the interval on component unmount
	}, []);

	return (
		<div className="flex items-center justify-center py-2">
			{[0, 1, 2].map((index) => (
				<div key={index} className={`${sx} w-3 h-3 mx-[3px] rounded-full ${activeDot === index ? "bg-slate-500" : "bg-gray-300"}`}></div>
			))}
		</div>
	);
};

export default Loading;

// ProgressBar.js
import React, { useState } from "react";

const ProgressBar = () => {
	const [progress, setProgress] = useState(0);

	const handleProgressChange = (e: any) => {
		const value = e.target.value;
		setProgress(value);
	};

	return (
		<div className="w-1/2 mx-auto mt-8">
			<label className="block text-sm font-medium text-gray-700">Progress</label>
			<div className="mt-1 relative rounded-md">
				<input
					type="range"
					min="0"
					max="100"
					step="1"
					value={progress}
					onChange={handleProgressChange}
					className="focus:outline-none focus:shadow-outline-blue focus:border-blue-300 w-full py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-4"
				/>
				<output className="absolute right-0 inline-block text-sm font-medium text-gray-700">{progress}%</output>
			</div>
			<div className="mt-4">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-gray-700">Progress Bar</span>
					<span className="text-sm font-medium text-gray-500">{progress}%</span>
				</div>
				<div className="mt-1 relative">
					<div className="flex h-2 bg-gray-200 rounded">
						<div style={{ width: `${progress}%` }} className="h-full bg-blue-500 rounded transition-all duration-300"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;

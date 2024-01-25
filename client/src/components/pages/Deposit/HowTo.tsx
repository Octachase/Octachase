import React from "react";

const HowTo = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<p className="text-sm mb-4">Kindly request the payment method that's best for you</p>

			<div className="flex flex-col justify-center items-center mt-2">
				<a href="https://xcoins.com/en/" className="block bg-[#3b4863] border-[1px] border-[#3b4863] text-sm px-4 py-2 " rel="noreferrer" target="_blank">
					Click here if you're in the United States to buy bitcoins with your credit card.
				</a>

				<a href="https://payments.changelly.com/" className="block bg-[#3b4863] border-[1px] border-[#3b4863] text-sm px-4 py-2 mt-3" rel="noreferrer" target="_blank">
					Click here if you're in the United Kindom to buy bitcoins with your credit card.
				</a>
			</div>
		</div>
	);
};

export default HowTo;

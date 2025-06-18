import React from "react";

import Staticpage from "@/components/layouts/Staticpage";
import Accordion from "@/components/molecules/Accordion";

const page = () => {
	return (
		<Staticpage>
			<main className="text-black">
				<section className="h-64 w-full flex items-center justify-center relative bg-[url('/assets/bg-about-header.jpg')] bg-cover">
					<h3 className="font-bold text-center text-4xl">FAQ Gray Trade Options</h3>
				</section>

				<section className="bg-[#222941] flex px-4 items-center justify-center flex-col py-12">
					<h3 className="text-center font-bold text-2xl mb-6 font-libre">Frequently Asked Questions</h3>
					<p className="w-full lg:w-2/3 opacity-40 text-sm text-center">
						Many of our customers have specific questions and concerns about our Professional trading services. Here are just a few of the questions asked and the answers to them.
					</p>

					<div className="mt-3 w-full ">
						<h3 className="text-center font-bold text-xl mb-2mt-4 font-libre opacity-70">General Questions</h3>
						<div className="mt-3 w-full max-w-6xl mx-auto bg-[#1C2235]">
							<Accordion
								question="What are the risks and guarantees for your customers?"
								answer="There are risks in Trading all assets, that is exactly why there is Gray Trade Options , all trade risk are borne by us, if there is any loss that stalls the trading,the Investor will be Refunded his Capital."
							/>
							<Accordion question="What is the minimum and maximum amounts that I can invest?" answer="The minimum deposit is only 500 USD, the maximum deposit is not limited." />
							<Accordion
								question="What is the schedule for my profit accrual?"
								answer="Profit is added to your account immediately the trade closes. Please check package types to confirm trade completion time."
							/>
							<Accordion
								question="What are the payment systems you operate with?"
								answer="Deposits are processed throught Bitcoin while Withdrawals are processed through Bitcoin & Bank/Cashapp Transfer."
							/>
						</div>
					</div>

					<div className="mt-3 w-full ">
						<h3 className="text-center font-bold text-xl mb-2 mt-4 font-libre opacity-70">Deposits Questions</h3>
						<div className="mt-3 w-full max-w-6xl mx-auto bg-[#1C2235]">
							<Accordion
								question="Are my funds at risk in case of Insolvency/Bankruptcy?"
								answer="No, we have a Backup account holding funds in Relation to the amount of invested funds, though we are confident of a foul proof trading technique ,we will not claim to be perfect and that is why we offer an assurance to return 100% of investors Capital if there is any issue."
							/>
							<Accordion
								question="How to make a deposit?"
								answer="Read the terms of the proposed investment strategy and make a deposit to your desired plan using the deposit section in your account. Send the Indicated amount from any Bitcoin wallet or Ethereum Wallet to the wallet address generated for your account. The deposit will be credited as soon as the funds are confirmed."
							/>
						</div>
					</div>
					<div className="mt-3 w-full ">
						<h3 className="text-center font-bold text-xl mb-2 mt-4 font-libre opacity-70">Withdrawal Questions</h3>
						<div className="mt-3 w-full max-w-6xl mx-auto bg-[#1C2235]">
							<Accordion
								question="When can I withdraw my profit?"
								answer="You can withdraw your profit from all of our investment plans once the trading period of such package elapses. You can also accumulate your profit to your desired amount till withdrawal. Always ensure to be in contact with your account manager. Also, our support is always available if assistance or enquiries needed."
							/>
						</div>
					</div>
				</section>
			</main>
		</Staticpage>
	);
};

export default page;

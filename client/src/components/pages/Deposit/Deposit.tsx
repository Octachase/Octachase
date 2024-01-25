import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

import copyToClipboard from "@/utils/copyToClipboard";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { usePostANewDepositProofMutation } from "@/apis/transactionsApi";
import { depositSchema } from "@/libs/hookform";

import PrimaryButton from "@/components/atoms/PrimaryButton";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";

const Deposit = () => {
	const { handleSubmit, register, reset } = useSelectedPropertiesFromHookForm(depositSchema);
	const [postADepositProof, { data, error, isLoading }] = usePostANewDepositProofMutation();
	const [copied, setCopied] = useState(false);
	const imageRef = useRef<null | HTMLInputElement>(null);
	const router = useRouter();
	const copyText = () => {
		copyToClipboard("bc1qqtel7mt50d209k4up3rnfwa2rhxaat7df5ryee");
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const addDeposit = (data: any) => {
		const { amount, txnId } = data;
		const file = imageRef?.current?.files ? imageRef?.current?.files[0] : null;
		if (!file) {
			toast.error("Please upload a receipt of confirmation");
			return;
		}

		postADepositProof({ amount, txnId, file });
	};

	useEffect(() => {
		if (!data) return;
		toast.success(data.message, { autoClose: 1500 });
		setTimeout(() => {
			router.push("/dashboard/transactions");
		}, 1500);
		reset();
		if (imageRef?.current?.value) imageRef.current.value = "";
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<div className="w-full ">
			<div className="flex flex-col items-center justify-center">
				<p className="w-full h-12 bg-[#D1ECF1] text-sm flex items-center justify-center text-[#0c5460] font-bold">
					STEP 1 - <span className="font-normal text-[#0c5460]">Send your deposit to the address below.</span>{" "}
				</p>
				<h3 className="text-xl md:text-2xl font-bold mt-4">MAKE A DEPOSIT</h3>
				<p className="text-sm font-bold mt-3">Octachase Official Wallet</p>
				<div className="flex flex-col md:flex-row items-stretch ">
					<p className="bg-white text-black text-sm font-bold px-2 py-[2px]">bc1qqtel7mt50d209k4up3rnfwa2rhxaat7df5ryee</p>
					<button className={`border-[2px]  ${copied ? "bg-green-700 border-green-300" : "bg-[#337AB7] border-[#2e6da4]"} text-[12px] px-2 py-[2px]`} onClick={copyText} disabled={copied}>
						{copied ? "Address Copied..." : "Copy Wallet Address"}
					</button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center mt-8">
				<p className="w-full h-12 bg-[#D8EFCC] text-sm flex items-center px-4 justify-start text-[#1f5c01] font-bold">
					STEP 2 - <span className="font-normal text-[#1f5c01]"> Confirm your deposit.</span>{" "}
				</p>

				<form onSubmit={handleSubmit(addDeposit)} className="border-[1px] p-4 md:p-8 w-full mt-4">
					<h3 className="text-2xl font-bold mt-4">CONFIRM YOUR DEPOSIT</h3>
					<div className="mt-2">
						<label htmlFor="amount" className="text-sm opacity-80 block mb-[3px]">
							Amount in $
						</label>
						<input type="text" {...register("amount")} id="amount" className="block w-full border-[1px] focus:outline-0 p-2 bg-[#464551]" placeholder="100.00" />
					</div>
					<div className="mt-2">
						<label htmlFor="amount" className="text-sm opacity-80 block mb-[3px]">
							Transaction ID
						</label>
						<input type="text" {...register("txnId")} id="txnId" className="block w-full border-[1px] focus:outline-0 p-2 bg-[#464551]" placeholder="txnId" />
						<p className="opacity-40 text-sm"> Make sure the transactionId is correct else the proof will be rejected</p>
					</div>
					<div className="mt-2">
						<label htmlFor="amount" className="text-sm opacity-80 block mb-[3px]">
							Payment Receipt Upload
						</label>
						<input type="file" accept="image/*" id="receipt" className="block w-full text-sm focus:outline-0 mt-2" ref={imageRef} />
					</div>

					<PrimaryButton text="Confirm My Payment" sx="!mt-4 !py-2 !px-10 !text-md !font-normal" type="submit" isLoading={isLoading} />
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Deposit;

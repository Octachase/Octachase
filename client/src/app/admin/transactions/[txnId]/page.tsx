"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { useAddFeesToATxnMutation, useLazyGetATransactionQuery, useModerateTxnStatusMutation } from "@/apis/transactionsApi";
import createDateFromString from "@/utils/createDate";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorApiRequest";
import useSelectedPropertiesFromHookForm from "@/hooks/useSelectedValuesFromHooks";
import { feesSchema } from "@/libs/hookform";

import Mainpage from "@/components/layouts/Mainpage";
import Loading from "@/components/atoms/Loading";
import PrimaryButton from "@/components/atoms/PrimaryButton";

const MoreDetails = ({ details }: any) => {
	const keysArr = useMemo(() => {
		return details ? Array.from(Object.keys(details)) : [];
	}, [details]);

	return (
		<>
			{keysArr.map((key, index) => {
				return (
					<Fragment key={index}>
						{details[key] && (
							<tr>
								<th className="w-[200px] text-left text-sm">{key.toUpperCase()}</th>
								<td className=""> {details[key]}</td>
							</tr>
						)}
					</Fragment>
				);
			})}
		</>
	);
};

const page = () => {
	const { txnId } = useParams();
	const { register, handleSubmit } = useSelectedPropertiesFromHookForm(feesSchema);
	const [getATxn, { data: txn, isLoading, error }] = useLazyGetATransactionQuery();
	const [addFeesRequest, { data: addFeesData, error: addFeesError, isLoading: addFeesLoading }] = useAddFeesToATxnMutation();
	const [moderateAtxn, { data: moderationData, isLoading: moderationLoading, error: moderationError }] = useModerateTxnStatusMutation();
	const router = useRouter();

	const [moderation, setModeration] = useState("");
	useEffect(() => {
		if (!txnId) return;
		getATxn({ txnId: txnId as string });
	}, [txnId]);

	useEffect(() => {
		if (!moderation) return;
		moderateAtxn({ status: moderation, txnId: txnId as string });
	}, [moderation]);

	useEffect(() => {
		if (!moderationData) return;
		toast.success("The transaction was successfully moderated", { autoClose: 1500 });

		setTimeout(() => {
			router.push("/admin/transactions");
		}, 500);
	}, [moderationData]);

	const addFees = (data: any) => {
		const { fees } = data;
		addFeesRequest({ fees, txnId: txnId as string });
	};

	useEffect(() => {
		if (!addFeesData) return;
		toast.success("Fees successfully added", { autoClose: 1500 });
		router.replace("/admin/withdrawals");
	}, [addFeesData]);

	useCreateErrorFromApiRequest(moderationError);
	useCreateErrorFromApiRequest(error);
	useCreateErrorFromApiRequest(addFeesError);
	return (
		<Mainpage isAdmin={true}>
			<div className="px-5">
				<h3 className="font-bold mb-6 uppercase">Transaction Details</h3>

				{!isLoading && (
					<>
						<div className="w-full overflow-x-auto">
							<table border={2} className="w-[150%] lg:w-full details">
								<tr>
									<th className="w-[200px] text-left text-sm">TYPE</th>
									<td className="text-sm">{txn?.type}</td>
								</tr>
								{txn?.type === "deposit" && (
									<tr>
										<th className="w-[200px] text-left text-sm">TXN ID</th>
										<td className="text-sm">{txn?.transactionId}</td>
									</tr>
								)}
								<tr>
									<th className="w-[200px] text-left text-sm">AMOUNT</th>
									<td className="text-sm">{txn?.amount}</td>
								</tr>
								<tr>
									<th className="w-[200px] text-left text-sm">TRANSACTION DATE</th>
									<td className="text-sm">{createDateFromString(txn?.createdAt)}</td>
								</tr>
								<tr>
									<th className="w-[200px] text-left text-sm">STATUS</th>
									<td className="text-sm">{txn?.status}</td>
								</tr>

								<MoreDetails details={txn?.details} />
							</table>
						</div>

						{txn?.status === "pending" && (
							<>
								{((txn?.fee !== 0 && txn.type === "withdrawal") || txn?.type === "deposit") && (
									<div className="mt-4">
										<h3 className="mb-3">Moderate Transaction</h3>
										<div className="flex w-full flex-col lg:flex-row items-center justify-start gap-2 lg:gap-6">
											<PrimaryButton
												text="Approve"
												isLoading={moderation === "approved" && moderationLoading}
												handleClick={() => setModeration("approved")}
												disabled={moderationLoading}
												sx="md:w-auto w-full "
											/>
											<PrimaryButton
												text="Decline"
												isLoading={moderation === "declined" && moderationLoading}
												sx="md:w-auto w-full py-2 border-[1px] !bg-transparent text-sm font-bold border-white "
												handleClick={() => setModeration("declined")}
												disabled={moderationLoading}
											/>
										</div>
										<ToastContainer />
									</div>
								)}

								{txn.fee === 0 && txn.type === "withdrawal" && (
									<div className="mt-8">
										{/* Add fees  */}
										<h1 className="font-bold text-sec text-2xl mb-3">ADD FEES FOR WITHDRAWAL</h1>

										<h3>Please add the fees for this withdrawal</h3>

										<form action="" onSubmit={handleSubmit(addFees)} className="w-1/2">
											<input
												{...register("fees")}
												placeholder="Enter fees for withdrawal"
												className="peer h-full w-full border-b-[1px] mb-4 border-blue-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white  outline outline-0 transition-all placeholder-shown:border-gray-500 focus:border-[#52afee] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
											/>
											<PrimaryButton text="Add Fees" type="submit" isLoading={addFeesLoading} disabled={addFeesLoading} />
											<ToastContainer />
										</form>
									</div>
								)}
							</>
						)}
					</>
				)}

				{isLoading && (
					<div className="w-full h-[50vh] flex items-center justify-center">
						<Loading />
					</div>
				)}
			</div>
		</Mainpage>
	);
};

export default page;

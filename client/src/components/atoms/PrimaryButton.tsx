import React from "react";
import Link from "next/link";

import Loading from "./Loading";
interface IButton {
	text: string;
	href?: string;
	sx?: string;
	handleClick?: any;
	type?: "button" | "submit" | "reset" | undefined;
	isLoading?: boolean;
	disabled?: boolean;
}
const PrimaryButton = ({ text, sx = "", type = "button", isLoading = false, disabled = false, handleClick, href }: IButton) => {
	const styles = `${sx} bg-sec text-white font-bold min-w-[200px] flex items-center justify-center py-4 px-8 ${isLoading || disabled ? "opacity-60" : "hover:opacity-70"} `;
	return (
		<>
			{!href && (
				<button type={type} className={styles} disabled={disabled || isLoading} onClick={() => (handleClick ? handleClick() : "")}>
					{isLoading ? <Loading /> : text}
				</button>
			)}
			{href && (
				<Link href={href} type={type} className={styles}>
					{isLoading ? <Loading /> : text}
				</Link>
			)}
		</>
	);
};

export default PrimaryButton;

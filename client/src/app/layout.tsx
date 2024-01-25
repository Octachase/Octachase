import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import InitialDispatch from "@/components/molecules/InitialDispatch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Octachase | Your Number One Trading Platform.",
	icons: {
		icon: "/favicon.png",
	},
	description: "We provide fastest trading using modern technologies. No delays in order executions and most accurate quotes. Our trading platform is available around the clock ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<InitialDispatch>{children}</InitialDispatch>
			</body>
		</html>
	);
}

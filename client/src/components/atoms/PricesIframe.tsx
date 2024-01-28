import React from "react";

const PricesIframe = ({ sx = "" }: { sx?: string }) => {
	return (
		<div className={`w-full mx-auto px-2 ${sx}`}>
			<div className="tradingview-widget-container bg-[#1e222d] h-20 overflow-y-hidden">
				<iframe
					className="w-full"
					src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22Nasdaq%20100%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22BTC%2FUSD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22ETH%2FUSD%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22compact%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A74%2C%22utm_source%22%3A%22Octachase.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22Octachase.com%2Fdashboard%2Fdeposit.php%22%7D"
					title="ticker tape TradingView widget"
					lang="en"></iframe>
			</div>
		</div>
	);
};

export default PricesIframe;

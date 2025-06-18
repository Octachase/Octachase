const validateType = (amount, type) => {
	if (!["starter", "silver", "gold", "platinum"].includes(type.toLowerCase())) return false;
	if ((amount < 500 || amount > 4999) && type === "starter") return false;
	if ((amount < 1000 || amount > 9999) && type === "silver") return false;
	if ((amount < 2500 || amount > 20000) && type === "gold") return false;
	if ((amount < 15000 || amount > 50000) && type === "platinum") return false;
	return true;
};

const calculateDaysRemaining = (type, createdAt) => {
	let days = { starter: 7, silver: 6, gold: 5, platinum: 3 };
	const today = new Date().getTime() / 1000;
	createdAt = new Date(createdAt).getTime() / 1000;

	// Get difference between today and the createdAt date
	let diffDays = Math.floor((today - createdAt) / (3600 * 24));
	return days[type] - diffDays <= 0 ? 0 : days[type] - diffDays;
};

module.exports = { validateType, calculateDaysRemaining };

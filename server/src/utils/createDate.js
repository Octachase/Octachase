function createDateFromString(inputDate) {
	if (!inputDate) return "";
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "August", "Sept", "Oct", "Nov", "Dec"];
	const date = new Date(inputDate);

	const day = date.getDate(),
		month = months[date.getMonth()],
		year = date.getFullYear();

	return `${day} ${month}, ${year}`; // Output: "19 Sep, 2023"
}

module.exports = createDateFromString;

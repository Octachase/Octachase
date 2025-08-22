function createDateFromString(inputDate: string) {
  if (!inputDate) return ''
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const date = new Date(inputDate)

  const day = date.getDate(), month = months[date.getMonth()], year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
  return formattedDate // Output: "19 Sep, 2023"
}

export default createDateFromString
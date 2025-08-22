const formatNumberIntoMoney = (number: number) => {
  number = number || 0;
  if (number < 1000) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
  }
  if (number < 1000000) {
    return (number / 1000).toFixed(2) + " K";
  }
  if (number < 1000000000) {
    return (number / 1000000).toFixed(2) + " M";
  }
  if (number < 1000000000000) {
    return (number / 1000000000).toFixed(2) + " B";
  }

  return (number / 1000000000000).toFixed(2) + " T";

}

export default formatNumberIntoMoney
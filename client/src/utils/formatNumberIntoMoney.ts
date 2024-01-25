const formatNumberIntoMoney = (number: number) => {
  number = number || 0;
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
}

export default formatNumberIntoMoney
const IntegerValidation = (number) => {
  const regex = /[0-9]d*$/;
  return regex.test(number);
};

export default IntegerValidation;

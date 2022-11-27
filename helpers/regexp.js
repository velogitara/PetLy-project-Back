const regexp = {
  // phone: /^(\(\d{3}\))\s?(\d{3}-\d{4})$/,
  phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
//   name: /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
  name: /^[а-яА-ЯёЁa-zA-Z-`\s]+$/,
};
module.exports = regexp;

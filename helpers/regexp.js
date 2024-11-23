const regexp = {
  phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
  name: /^[а-яА-ЯёЁa-zA-Z-`\s]+$/,
};
module.exports = regexp;

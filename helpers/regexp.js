const regexp = {
  phone: /^(\(\d{3}\))\s?(\d{3}-\d{4})$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
};

module.exports = regexp;

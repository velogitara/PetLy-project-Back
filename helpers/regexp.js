const regexp = {
  phone: /^(\(\d{3}\))\s?(\d{3}-\d{4})$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
  name: /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
};

module.exports = regexp;

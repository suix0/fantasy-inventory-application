const toTitleCase = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

module.exports = { toTitleCase };

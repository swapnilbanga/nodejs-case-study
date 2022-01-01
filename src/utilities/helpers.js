const isValidDate = (d) => {
  return d instanceof Date && isFinite(d);
};

module.exports = {
  isValidDate,
};

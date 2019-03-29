function queryToNumbers(object) {
  const obj = {};
  Object.keys(obj).forEach((item) => {
    obj[item] = parseInt(object[item], 10);
  });

  return obj;
}

module.exports = queryToNumbers;

interface Query {
    [key: string]: string;
}

interface QueryToNumber {
  [key: string]: number;
}


function queryToNumbers(object: Query):QueryToNumber{
  const obj: QueryToNumber = {};
  Object.keys(obj).forEach((item) => {
    obj[item] = parseInt(object[item], 10);
  });

  return obj;
}

module.exports = queryToNumbers;

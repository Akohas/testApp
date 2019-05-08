import { Query, QueryToNumber } from '../interfaces/helpers'

function queryToNumbers (query: Query): QueryToNumber {
  const result: QueryToNumber = {}
  Object.keys(query).forEach((item) => {
    result[item] = parseInt(query[item], 10)
  })

  return result
}

module.exports = queryToNumbers

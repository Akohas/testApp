import { Query, QueryToNumber } from '../interfaces/helpers'

export function queryToNumbers (query: Query): QueryToNumber {
  const result: QueryToNumber = {}
  Object.keys(query).forEach((item) => {
    result[item] = parseInt(query[item], 10)
  })

  return result
}

export function baseResponse (errorMessage: string | null = null, data: any = null, status: number | undefined = 200) {
  return {
    status,
    data,
    errorMessage
  }
}

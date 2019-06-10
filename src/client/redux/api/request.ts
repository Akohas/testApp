import superagent from 'superagent'
import { authToken } from '../reducers/auth'
const agent = superagent.agent()

const getAuthHeaders = (state) => {
  const token = authToken(state)
  if (token) return { Authorization: `Bearer ${token}` }

  return {}
}

function setHeaders (headers, state) {
  return {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  ...getAuthHeaders(state),
	  ...headers
  }
}

const methods = {
  get: ({ url, headers, data, state }) => {
	  return agent.get(url).query(data).set(headers)
  },
  delete: ({ url, headers }) => {
	  return agent.delete(url).set(headers)
  },
  post: ({ url, headers, data }) => {
	  return agent.post(url).send(data).set(headers)
  },
  put: ({ url, headers, data }) => {
	  return agent.put(url).send(data).set(headers)
  }
}

function getUrl (url: string) {
  return `http://localhost:3030/${url}`
}

export default (state) => (url, method = 'get', data = {}, headers = {}) => {

  return methods[method]({ url: getUrl(url), headers: setHeaders(headers, state), data })
	  .timeout({
    response: 20000,  // Wait for the server to start sending,
    deadline: 30000 // allow for the file to finish loading.
	  })
	  // .withCredentials()
	  .then(
		({ body }) => ({ status: body.status, errorMessage: body.errorMessage, data: body.data }),
		(error) => ({ status: 500, errorMessage: error.message })
	  )
}

import superagent from 'superagent'

const agent = superagent.agent()

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  if (token) return { Authorization: `Bearer ${token}` }

  return {}
}

function setHeaders (headers) {
  return {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  ...getAuthHeaders(),
	  ...headers
  }
}

const methods = {
  get: ({ url, headers, data }) => {
	  return agent.get(url).query(data).set(setHeaders(headers))
  },
  delete: ({ url, headers }) => {
	  return agent.delete(url).set(setHeaders(headers))
  },
  post: ({ url, headers, data }) => {
	  return agent.post(url).send(data).set(setHeaders(headers))
  },
  put: ({ url, headers, data }) => {
	  return agent.put(url).send(data).set(setHeaders(headers))
  }
}

function getUrl (url: string) {
  return `http://localhost:3030/${url}`
}

export default function request (url, method = 'get', data = {}, headers = {}) {

  return methods[method]({ url: getUrl(url), headers, data })
	  .timeout({
    response: 20000,  // Wait for the server to start sending,
    deadline: 30000 // allow for the file to finish loading.
	  })
	  // .withCredentials()
	  .then(
		(response) => ({ response: response.body }),
		(error) => ({ error })
	  )
}

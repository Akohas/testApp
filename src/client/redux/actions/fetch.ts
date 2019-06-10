import { ActionTypes, XHRResponse } from '../../interfaces'

function isSuccessResponse (response: XHRResponse) {
  return (response.status === 200 || response.status === 201) && !response.errorMessage
}

export default (
  { REQUEST, SUCCESS, FAILURE }: ActionTypes,
  isFetchingFunc: (x) => boolean,
  fetchFunc: (x) => Promise<XHRResponse>
) => (dispatch, getState) => {
  if (isFetchingFunc(getState())) {
    return Promise.resolve()
  }

  dispatch({ type: REQUEST })

  return fetchFunc(getState()).then(
    (response: XHRResponse) => {
      if (isSuccessResponse(response)) {
        return dispatch({
          type: SUCCESS,
          response: response.data
        })
      }

      return dispatch({
        type: FAILURE,
        error: {
          status: response.status,
          message: response.errorMessage || 'try again'
        }
      })
    },
    error => dispatch({
      type: FAILURE,
      error: {
        status: 500,
        message: error.message
      }
    })
  )
}

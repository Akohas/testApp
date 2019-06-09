export default ({ REQUEST, SUCCESS, FAILURE }, isFetchingFunc, fetchFunc) => (dispatch, getState) => {
  if (isFetchingFunc(getState())) {
    return Promise.resolve()
  }

  dispatch({ type: REQUEST })

  return fetchFunc(getState()).then(
    response => {
      return dispatch({
        type: SUCCESS,
        response
      })
    },
    error => {
      return dispatch({
        type: FAILURE,
        errorMessage: error.message
      })
    }
  )
}

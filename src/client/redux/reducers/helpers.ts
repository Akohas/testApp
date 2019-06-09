
import { ActionTypes } from '../../interfaces'

type Action = {
  type: string,
  error?: string,
  response?: any
}

export const successReducer = ({ REQUEST, SUCCESS, FAILURE }: ActionTypes, fn: Function = (res => res), initState: any = null, update: boolean = true) =>
  (state = initState, { type, response }: Action) => {
    switch (type) {
      case REQUEST:
        return update ? initState : state
      case SUCCESS:
        return fn(response, state)
      case FAILURE:
        return update ? initState : state
      default: return state || initState
    }
  }

export const errorReducer = ({ REQUEST, SUCCESS, FAILURE }) => (state = null, { type, error }: Action) => {
  switch (type) {
    case REQUEST:
    case SUCCESS:
      return null
    case FAILURE:
      return error
    default: return state
  }
}

export const fetchingReducer = ({ REQUEST, SUCCESS, FAILURE }) => (state = false, { type }: Action) => {
  switch (type) {
    case REQUEST:
      return true
    case SUCCESS:
    case FAILURE:
      return false
    default: return state
  }
}

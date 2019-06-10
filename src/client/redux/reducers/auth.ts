import { combineReducers } from 'redux'
import { AUTH } from '../actions/actionTypes'
import { errorReducer, fetchingReducer, successReducer } from './helpers'

const authReducer = combineReducers({
  error: errorReducer(AUTH),
  isFetching: fetchingReducer(AUTH),
  done: successReducer(AUTH, () => true, false, true),
  token: successReducer(AUTH, (response) => response.token, false, true)
})

export const authSucceed = state => state.auth.done
export const authError = state => state.auth.error
export const isAuthFetching = state => state.auth.isFetching
export const authToken = state => state.auth.token

export default authReducer

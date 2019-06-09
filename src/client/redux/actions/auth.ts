import {
  AUTH
} from './actionTypes'
import fetch from './fetch'
import { auth } from '../api'
import { isAuthFetching } from '../reducers/auth'

export const fetchAuth = (data) =>
  fetch(
    AUTH,
    isAuthFetching,
    state => auth(state, data)
  )

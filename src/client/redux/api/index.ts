import request from './request'

export const auth = (state, data) => request('auth', 'post', data)

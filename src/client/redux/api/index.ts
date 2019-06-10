import request from './request'

export const auth = (state, data) => request(state)('auth', 'post', data)

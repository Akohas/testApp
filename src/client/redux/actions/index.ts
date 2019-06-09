import { ActionTypes } from '../../interfaces'
export const getActionTypes = (action: string): ActionTypes => ({
  REQUEST: action + '_REQUEST',
  SUCCESS: action + '_SUCCESS',
  FAILURE: action + '_FAILURE'
})

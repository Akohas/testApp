export interface ActionTypes {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string
}

export interface XHRResponse {
  status: number,
  errorMessage?: string | null,
  data?: any
}

export interface ActionError {
  status: number,
  message: string,
}

export interface Action {
  type: string,
  error?: ActionError,
  response?: any
}

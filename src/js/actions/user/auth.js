import * as type from '../../constants/action_types'

export const setAuth = (auth) => {
  return { type: type.SET_AUTH, auth: auth }
}

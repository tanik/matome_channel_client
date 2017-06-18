import reducer from '../../../src/js/reducers/user/auth'
import * as types from '../../../src/js/constants/action_types'

console.warn = () => {}

describe('user auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      "uid": "",
      "client": "",
      "access-token": "",
      "expiry": 0,
      "user_id": null,
    })
  })

  it('should handle setAuth with new auth infomation', () => {
    const prevState = {
      "uid": "",
      "client": "",
      "access-token": "",
      "expiry": 0,
      "user_id": null,
    }
    const auth = {
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
    }
    expect(
      reducer(prevState, {type: types.SET_AUTH, auth})
    ).toEqual({
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
      "user_id": null,
    })
  })

  it('should handle setAuth with old auth infomation', () => {
    const prevState = {
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
      "user_id": null,
    }
    const auth = {
      "uid": "user@example.com",
      "client": "clinet-YYYYYY",
      "access-token": "access-token-YYYYYY",
      "expiry": 1497792360,
    }
    expect(
      reducer(prevState, {type: types.SET_AUTH, auth})
    ).toEqual({
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
      "user_id": null,
    })
  })

  it('should handle setAuth with only user_id', () => {
    const prevState = {
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
      "user_id": null,
    }
    const auth = {
      user_id: 1
    }
    expect(
      reducer(prevState, {type: types.SET_AUTH, auth})
    ).toEqual({
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
      "user_id": 1,
    })
  })

  it('should handle setAuth with empty object', () => {
    const prevState = {
      "uid": "user@example.com",
      "client": "clinet-XXXXXX",
      "access-token": "access-token-XXXXXX",
      "expiry": 1497792365,
      "user_id": 1,
    }
    expect(
      reducer(prevState, {type: types.SET_AUTH, auth: {}})
    ).toEqual({
      "uid": "",
      "client": "",
      "access-token": "",
      "expiry": 0,
      "user_id": null,
    })
  })
})

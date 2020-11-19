import baseApi from './baseApi'
import { AUTH_ENDPOINT } from '../core/appConstants'
import { setToken, removeToken, getDecodedToken } from '../config/auth/credentials'

class AuthService {
  static login = async (credentials) => {
    try {
      const response = await baseApi.post(AUTH_ENDPOINT, credentials)
      if (response) setToken(response.token)
    } catch (error) {
      throw error
    }
  }

  static currentUser = () => getDecodedToken()

  static logout = () => removeToken()
}

export default AuthService

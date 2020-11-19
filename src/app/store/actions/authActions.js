import { toast } from 'react-toastify'
import * as actionTypes from './actionTypes'
import AuthService from '../../api/authService'
import { closeModal } from './modalActions'
import history from '../../..'

const loginUser = () => {
  return { type: actionTypes.LOGIN_USER }
}

const setCurrentUser = (currentUser) => {
  return { type: actionTypes.CURRENT_USER, payload: { currentUser } }
}

const signOutUser = () => {
  return { type: actionTypes.LOGOUT_USER }
}

export const getUser = () => (dispatch) => {
  try {
    const user = AuthService.currentUser()
    dispatch(setCurrentUser(user))
  } catch (error) {
    toast.error(error)
  }
}

export const login = (credentials) => async (dispatch) => {
  try {
    await AuthService.login(credentials)
    dispatch(loginUser())
    dispatch(getUser())
    dispatch(closeModal())
    toast.success('¡Bienvenido!')
    history.push('/cursos')
  } catch (error) {
    throw error
  }
}

export const logout = () => (dispatch) => {
  try {
    AuthService.logout()
    dispatch(signOutUser())
    history.push('/')
  } catch (error) {
    toast.error(error)
  }
}

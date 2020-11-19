import { MODAL_CLOSE, MODAL_OPEN } from '../actions/actionTypes'
import createReducer from './reducerUtils'

const initialState = {
  open: false,
  body: null,
  size: null,
  closeIcon: false,
}

const openModal = (state, payload) => {
  return {
    ...state,
    open: true,
    body: payload.body,
    size: payload.size,
    closeIcon: payload.closeIcon,
  }
}

const closeModal = () => {
  return {
    open: false,
    body: null,
    size: null,
  }
}

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal,
})

import { combineReducers } from 'redux'
import authReducer from './authReducer'
import dishReducer from './dishReducer'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
  // set global state
  modal: modalReducer,
  auth: authReducer,
  dish: dishReducer,
})

export default rootReducer

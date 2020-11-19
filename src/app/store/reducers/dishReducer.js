import createReducer from './reducerUtils'
import {
  LOADING_DISH,
  LOADING_DISHES,
  FETCH_DISH,
  FETCH_DISHES,
  UPDATE_DISH,
  ADD_DISH,
  DELETE_DISH,
} from '../actions/actionTypes'

const initialState = {
  dishes: [],
  dish: null,
  loadingDish: false,
  loadingDishes: false,
}

const loadingDishes = (state, payload) => {
  return { ...state, loadingDishes: payload.loading }
}

const loadingDish = (state, payload) => {
  return { ...state, loadingDish: payload.loading }
}

const fetchDishes = (state, payload) => {
  return { ...state, dishes: payload.dishes }
}

const fetchDish = (state, payload) => {
  return { ...state, dish: payload.dish }
}

const addDish = (state, payload) => {
  return { ...state, dishes: payload.dishes }
}

const updateDish = (state, payload) => {
  return { ...state, dishes: payload.dishes }
}

const deleteDish = (state, payload) => {
  return { ...state, dishes: payload.dishes }
}

export default createReducer(initialState, {
  [LOADING_DISH]: loadingDish,
  [LOADING_DISHES]: loadingDishes,
  [FETCH_DISH]: fetchDish,
  [FETCH_DISHES]: fetchDishes,
  [UPDATE_DISH]: updateDish,
  [ADD_DISH]: addDish,
  [DELETE_DISH]: deleteDish,
})

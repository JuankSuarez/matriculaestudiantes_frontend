import { toast } from 'react-toastify'
import * as actionTypes from './actionTypes'
import DishService from '../../api/dishService'
import { closeModal } from './modalActions'

const loadingDishes = (loading) => {
  return { type: actionTypes.LOADING_DISHES, payload: { loading } }
}

const loadingDish = (loading) => {
  return { type: actionTypes.LOADING_DISH, payload: { loading } }
}

const fecthDishesAction = (dishes) => {
  return { type: actionTypes.FETCH_DISHES, payload: { dishes } }
}

const fetchDishAction = (dish) => {
  return { type: actionTypes.FETCH_DISH, payload: { dish } }
}

const addDishAction = (dishes) => {
  return { type: actionTypes.ADD_DISH, payload: { dishes } }
}

const updateDishAction = (dishes) => {
  return { type: actionTypes.UPDATE_DISH, payload: { dishes } }
}

const deleteDishAction = (dishes) => {
  return { type: actionTypes.DELETE_DISH, payload: { dishes } }
}

export const fetchDishes = () => async (dispatch) => {
  dispatch(loadingDishes(true))
  try {
    const dishes = await DishService.fetchDishes()

    dispatch(fecthDishesAction(dishes))
    dispatch(loadingDishes(false))
  } catch (error) {
    dispatch(loadingDishes(false))
    toast.error('Problem loading dishes')
  }
}

export const fetchDish = (id) => async (dispatch) => {
  dispatch(loadingDish(true))
  try {
    const dish = await DishService.fetchDish(id)

    dispatch(fetchDishAction(dish))
    dispatch(loadingDish(false))
  } catch (error) {
    dispatch(loadingDish(false))
    toast.error('Problem loading the selected dish')
  }
}

export const addDish = (dish) => async (dispatch, getState) => {
  dispatch(loadingDish(true))
  try {
    const newCurso = await DishService.addDish(dish)
    console.log("error ",getState())
    const dishes = [...getState().dish.dishes]
    dishes.push(newCurso)

    // Actualizamos el estado global
    dispatch(addDishAction(dishes))
    dispatch(closeModal())
    dispatch(loadingDish(false))
    toast.success('El curso ha sido agregado correctamente')
  } catch (error) {
    console.log("error ",error)
    dispatch(loadingDish(false))
    toast.error('Error al agregar un curso')
  }
}

export const updateDish = (dish) => async (dispatch, getState) => {
  dispatch(loadingDish(true))
  try {
    const updatedDish = await DishService.updateDish(dish)

    const dishes = [...getState().dish.dishes]
    const index = dishes.findIndex((a) => a.id === updatedDish.id)
    dishes[index] = updatedDish

    dispatch(updateDishAction(dishes))

    dispatch(loadingDish(false))
    dispatch(closeModal())
  } catch (error) {
    dispatch(loadingDish(false))
    toast.error('Problem updating the dish')
  }
}

export const deleteDish = (id) => async (dispatch, getState) => {
  dispatch(loadingDish(true))
  try {
    await DishService.deleteDish(id)
    let dishes = [...getState().dish.dishes]

    dishes = dishes.filter((a) => a.id !== id)

    dispatch(deleteDishAction(dishes))
    dispatch(loadingDish(false))
    toast.info('The selected dish was removed')
  } catch (error) {
    dispatch(loadingDish(false))
    toast.error('Problem deleting the dish')
  }
}

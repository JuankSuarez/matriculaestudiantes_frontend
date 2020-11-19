import baseApi from './baseApi'
import { CURSOS_ENDPOINT } from '../core/appConstants'

const getDishUrl = (id) => `${CURSOS_ENDPOINT}/${id}`

class DishService {
  static fetchDishes = () => baseApi.get(CURSOS_ENDPOINT)

  static fetchDish = async (id) => baseApi.get(getDishUrl(id))

  static addDish = async (dish) => baseApi.post(CURSOS_ENDPOINT, dish)

  static updateDish = async (dish) => baseApi.put(CURSOS_ENDPOINT, dish)

  static deleteDish = async (id) => baseApi.delete(getDishUrl(id))
}

export default DishService

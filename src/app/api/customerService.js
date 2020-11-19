import { CUSTOMER_ENDPOINT } from '../core/appConstants'
import baseApi from './baseApi'

const getCustomerUrl = (id) => `${CUSTOMER_ENDPOINT}/${id}`

class CustomerService {
  static fetchCustomers = () => baseApi.get(CUSTOMER_ENDPOINT)

  static fetchCustomer = (id) => baseApi.get(getCustomerUrl(id))

  static addCustomer = (customer) => baseApi.post(CUSTOMER_ENDPOINT, customer)

  static updateCustomer = (customer) => baseApi.put(CUSTOMER_ENDPOINT, customer)

  static uploadCustomerPhoto = (id, photo) => baseApi.postForm(`${CUSTOMER_ENDPOINT}/subir/${id}`, photo)

  static removeCustomer = (id) => baseApi.delete(getCustomerUrl(id))
}

export default CustomerService

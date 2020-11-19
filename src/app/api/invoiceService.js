import baseApi from './baseApi'
import { INVOICE_ENDPOINT } from '../core/appConstants'

class InvoiceService {
  static fetchInvoices = () => baseApi.get(INVOICE_ENDPOINT)

  static fetchInvoice = (id) => baseApi.get(`${INVOICE_ENDPOINT}/${id}`)

  static createInvoice = (invoice) => baseApi.post(INVOICE_ENDPOINT, invoice)
}

export default InvoiceService

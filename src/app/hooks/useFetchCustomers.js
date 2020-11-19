import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import CustomerService from '../api/customerService'

const useFetchCustomers = () => {
  const [customers, setCustomers] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    CustomerService.fetchCustomers()
      .then((response) => {
        setCustomers(response)
      })
      .catch((error) => {
        toast.error(error)
      })
    setLoading(false)
  }, [])

  return [customers, loading]
}

export default useFetchCustomers

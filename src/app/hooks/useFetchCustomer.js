import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomerService from '../api/customerService'

const useFetchCustomer = (id) => {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (id)
      CustomerService.fetchCustomer(id)
        .then((response) => {
          setCustomer(response)
        })
        .catch((error) => {
          toast.error(error)
        })
    setLoading(false)
  }, [id])

  return [customer, loading]
}

export default useFetchCustomer

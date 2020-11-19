import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import CustomerHeader from './CustomerHeader'
import PhotoUploadWidget from '../common/photoUpload/PhotoUploadWidget'
import CustomerService from '../../app/api/customerService'
import useFetchCustomer from '../../app/hooks/useFetchCustomer'

const CustomerProfile = ({ customerId }) => {
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [customerDetail, setCustomerDetail] = useState(null)
  const [customer] = useFetchCustomer(customerId)

  useEffect(() => {
    setCustomerDetail(customer)
  }, [customer])

  const handleUploadImage = async (photo) => {
    setUploadingPhoto(true)
    try {
      const updatedCustomer = await CustomerService.uploadCustomerPhoto(customerId, photo)
      setUploadingPhoto(false)
      setCustomerDetail(updatedCustomer)
    } catch (error) {
      setUploadingPhoto(false)
      toast.error(error)
    }
  }

  return (
    <Grid>
      <Grid.Column width="16">
        {customerDetail && (
          <>
            <CustomerHeader customer={customerDetail} />
            <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}

CustomerProfile.propTypes = {
  customerId: PropTypes.string.isRequired,
}

export default CustomerProfile

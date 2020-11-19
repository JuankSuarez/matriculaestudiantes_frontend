import React, { useEffect, useState } from 'react'
import { combineValidators, isRequired } from 'revalidate'
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import useFetchCustomer from '../../app/hooks/useFetchCustomer'
import ErrorMessage from '../form/ErrorMessage'
import TextInput from '../form/TextInput'

const validate = combineValidators({
  nombres: isRequired({ message: 'Los nombres son requeridos' }),
  apellidos: isRequired({ message: 'Los apellidos son requeridos' }),
  dni: isRequired({ message: 'el dni es requerido' }),
  edad: isRequired({ message: 'La edad es requerida' })
})

const CustomerForm = ({ customerId, submitHandler }) => {
  const [actionLabel, setActionLabel] = useState('Agregar Estudiante')
  // Custom hook
  const [customer, loading] = useFetchCustomer(customerId)

  useEffect(() => {
    if (customerId) {
      setActionLabel('editar estudiante')
    } else setActionLabel('Agregar Estudiante')
  }, [customerId])

  return (
    <FinalForm
      onSubmit={(values) => submitHandler(values)}
      initialValues={customerId && customer}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading}>
          <Header as="h2" content={actionLabel} color="yellow" textAlign="center" />
          <Field name="nombres" component={TextInput} placeholder="Nombres" />
          <Field name="apellidos" component={TextInput} placeholder="Apellidos" />
          <Field name="dni" component={TextInput} placeholder="DNI" />
          <Field name="edad" component={TextInput} type="number" placeholder="Edad" />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text="Invalid username or password" />
          )}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="green"
            content={actionLabel}
          />
        </Form>
      )}
    />
  )
}

CustomerForm.propTypes = {
  customerId: PropTypes.string,
  submitHandler: PropTypes.func.isRequired,
}

CustomerForm.defaultProps = {
  customerId: null,
}

export default CustomerForm

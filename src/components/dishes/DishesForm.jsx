import React, { useEffect, useState } from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, composeValidators, isRequired } from 'revalidate'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'
import { fetchDish, addDish, updateDish } from '../../app/store/actions/dishActions'
import ErrorMessage from '../form/ErrorMessage'

const validate = combineValidators({
  nombre: isRequired({ message: 'obligatorio' }),
  siglas: isRequired({ message: 'obligatorio' }),
})

const actions = {
  fetchDish,
  addDish,
  updateDish,
}

const mapState = (state) => ({
  dish: state.dish.dish,
  loading: state.dish.loadingDish,
})

const DishesForm = ({ id, dish, fetchDish, loading, addDish, updateDish }) => {
  const [actionLabel, setActionLabel] = useState('Agregar curso')

  useEffect(() => {
    if (id) {
      fetchDish(id)
      setActionLabel('Editar curso')
    } else setActionLabel('Agregar curso')
  }, [fetchDish, id])

  const handleCreateorEdit = (values) => {
    if (id) {
      updateDish(values)
    } else {
      const newDish = {
        nombre: values.nombre,
        siglas: values.siglas,
        estado: true,
      }
      addDish(newDish)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleCreateorEdit(values)}
      initialValues={id && dish}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading}>
          <Header as="h2" content={actionLabel} color="yellow" textAlign="center" />
          <Field name="nombre" component={TextInput} placeholder="nombre del curso" />
          <Field name="siglas" component={TextInput} placeholder="siglas del curso" />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid values" />}
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

DishesForm.propTypes = {
  id: PropTypes.string,
  dish: PropTypes.object,
  fetchDish: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  addDish: PropTypes.func.isRequired,
  updateDish: PropTypes.func.isRequired,
}

DishesForm.defaultProps = {
  id: null,
  dish: null,
}

export default connect(mapState, actions)(DishesForm)

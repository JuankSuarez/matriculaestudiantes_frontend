import React, { useEffect, useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { Button, Form, Grid, Header, Popup, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import history from '../..'
import ErrorMessage from '../form/ErrorMessage'
import TextAreaInput from '../form/TextAreaInput'
import SelectedInput from '../form/SelectedInput'

import { fetchDishes } from '../../app/store/actions/dishActions'
import InvoiceService from '../../app/api/invoiceService'
import useFetchCustomers from '../../app/hooks/useFetchCustomers'

const validate = combineValidators({
  estudiante: isRequired(''),
  curso: isRequired(''),
})

const actions = {
  fetchDishes,
}

const mapState = (state) => {
  const dishes = []

  if (state.dish.dishes && state.dish.dishes.length > 0) {
    state.dish.dishes.forEach((item) => {
      const dish = {
        key: item.id,
        text: item.nombre,
        value: item.id,
      }
      dishes.push(dish)
    })
  }

  return {
    loading: state.dish.loadingDishes,
    dishes,
  }
}

const InvoiceForm = ({ fetchDishes, dishes, loading }) => {
  const [customers] = useFetchCustomers()
  const [customersList, setCustomersList] = useState([])
  const [loadingCustomers, setLoadingCustomers] = useState(true)
  const [items, setItems] = useState([])
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (dishes.length === 0) {
      fetchDishes()
    }
    setLoadingCustomers(true)
    if (customers) {
      const customersList = []
      customers.forEach((item) => {
        const customer = {
          key: item.id,
          text: `${item.nombres} ${item.apellidos}`,
          value: item.id,
        }
        customersList.push(customer)
      })
      setCustomersList(customersList)
      setLoadingCustomers(false)
    }
  }, [customers, dishes.length, fetchDishes])

  const handleAddingItems = () => {
    const newItems = [...items]
    const dishesList = [...dishes]
    const index = newItems.findIndex((a) => a.id === item)
    if (index > -1) {
      newItems[index] = {
        id: newItems[index].id,
        name: newItems[index].name,
        quantity: newItems[index].quantity + 1,
      }
      setItems(newItems)
    } else {
      const newItem = {
        id: item,
        name: dishesList.filter((a) => a.key === item)[0].text,
        quantity: 1,
      }
      newItems.push(newItem)
    }
    setItems(newItems)
  }

  const handleRemoveItems = (id) => {
    let updatedItems = [...items]
    updatedItems = updatedItems.filter((a) => a.id !== id)
    setItems(updatedItems)
  }

  const handleAddNewInvoice = async (values) => {
    const newItems = [...items]
    const itemsForInvoice = newItems.map((item) => {
      return { cantidad: item.quantity, curso: { id: item.id } }
    })
    
    const newInvoice = {
      estudiante: {
        id: values.estudiante,
      },
      items: itemsForInvoice,
    }
    try {
      const invoice = await InvoiceService.createInvoice(newInvoice)
      toast.info('El estudiante se ha matriculado!')
      history.push(`invoice/${invoice.id}`)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleAddNewInvoice(values)}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading || loadingCustomers}>
          <Header as="h2" content="Registrar matricula" color="green" textAlign="center" />
          <Field
            name="estudiante"
            component={SelectedInput}
            placeholder="Seleccionar estudiante"
            options={customersList}
            width="3"
          />
          <Grid columns="2">
            <Grid.Row columns="2">
              <Grid.Column width="5">
                <Field
                  name="curso"
                  component={SelectedInput}
                  placeholder="Seleccionar curso"
                  options={dishes}
                  width="3"
                  handleOnChange={(e) => setItem(e)}
                />
              </Grid.Column>
              <Grid.Column>
                <Popup
                  inverted
                  content="Add Dish To Invoice"
                  trigger={
                    <Button
                      type="button"
                      loading={submitting}
                      color="violet"
                      icon="plus circle"
                      onClick={handleAddingItems}
                      disabled={!item}
                    />
                  }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {items && items.length > 0 && (
                <Table celled collapsing style={{ marginLeft: '2%' }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Curso</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {items.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          <Popup
                            inverted
                            content="Remove from Invoice"
                            trigger={
                              <Button
                                color="red"
                                icon="remove circle"
                                type="button"
                                onClick={() => handleRemoveItems(item.id)}
                              />
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Grid.Row>
          </Grid>
          <br />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid Values" />}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine || items.length === 0}
            loading={submitting}
            color="yellow"
            content="Registrar Matricula"
          />
        </Form>
      )}
    />
  )
}

InvoiceForm.propTypes = {
  fetchDishes: PropTypes.func.isRequired,
  dishes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapState, actions)(InvoiceForm)

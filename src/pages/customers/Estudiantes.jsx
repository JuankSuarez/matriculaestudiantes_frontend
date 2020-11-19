import React, { useEffect, useState } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'
import { openModal, closeModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import CustomerForm from '../../components/customers/CustomerForm'
import CustomerService from '../../app/api/customerService'
import CustomerProfile from '../../components/customers/CustomerProfile'
import useFetchCustomers from '../../app/hooks/useFetchCustomers'

const actions = {
  openModal,
  closeModal,
}

const Customers = ({ openModal, closeModal }) => {
  const [customersList, setCustomersList] = useState([])
  const [loadingAction, setLoadingAction] = useState(false)
  const [loading, setLoading] = useState(true)

  const [customers] = useFetchCustomers()

  useEffect(() => {
    setLoading(true)
    if (customers) {
      setCustomersList(customers)
      setLoading(false)
    }
  }, [customers])

  const handleCreateorEdit = async (values) => {
    const customersUpdatedList = [...customersList]
    try {
      if (values.id) {
        const updatedCustomer = await CustomerService.updateCustomer(values)
        const index = customersUpdatedList.findIndex((a) => a.id === values.id)
        customersUpdatedList[index] = updatedCustomer
        toast.info('El estudiante '+values.nombres+' fue actualizado')
      } else {
        const customer = {
          nombres: values.nombres,
          apellidos: values.apellidos,
          dni: values.dni,
          edad: values.edad,
        }
        const newCustomer = await CustomerService.addCustomer(customer)
        customersUpdatedList.push(newCustomer)
        toast.success('El estudiante '+ values.nombres + ' fue creado')
      }
      setCustomersList(customersUpdatedList)
    } catch (error) {
      toast.error(error)
      console.log("Error", error)
    }
    closeModal()
  }

  const handleDeleteCustomer = async (id) => {
    setLoadingAction(true)
    try {
      let customersUpdatedList = [...customersList]
      await CustomerService.removeCustomer(id)
      customersUpdatedList = customersUpdatedList.filter((a) => a.id !== id)
      setCustomersList(customersUpdatedList)
      setLoadingAction(false)
      toast.info('El estudiante fue eliminado')
    } catch (error) {
      setLoadingAction(false)
      toast.error(error)
    }
  }

  let customersArea = <h4>No existen categorias asociadas</h4>
  if (customersList && customersList.length > 0) {
    customersArea = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="3">Nombres</Table.HeaderCell>
            <Table.HeaderCell width="3">Apellidos</Table.HeaderCell>
            <Table.HeaderCell width="2">DNI</Table.HeaderCell>
            <Table.HeaderCell width="3">Edad</Table.HeaderCell>
            <Table.HeaderCell width="3"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customersList.map((estudiante) => (
            <Table.Row key={estudiante.id}>
              <Table.Cell>{estudiante.nombres}</Table.Cell>
              <Table.Cell>{estudiante.apellidos}</Table.Cell>
              <Table.Cell>{estudiante.dni}</Table.Cell>
              <Table.Cell>{estudiante.edad}</Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Actualizar estudiante"
                  trigger={
                    <Button
                      color="violet"
                      icon="edit"
                      loading={loadingAction}
                      onClick={() => {
                        openModal(<CustomerForm customerId={estudiante.id} submitHandler={handleCreateorEdit} />)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Eliminar estudiante"
                  trigger={
                    <Button
                      color="red"
                      icon="trash"
                      loading={loadingAction}
                      onClick={() => {
                        handleDeleteCustomer(estudiante.id)
                      }}
                    />
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }

  if (loading) return <LoadingComponent content="Cargando estudiantes..." />

  return (
    <>
      <Segment>
        <Breadcrumb size="small">
          <Breadcrumb.Section>Resources</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Estudiantes</Breadcrumb.Section>
        </Breadcrumb>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="list alternate outline" />
            Lista de estudiantes
          </Header>
        </Divider>
        <Segment>
          <Button
            size="large"
            content="Nuevo Estudiante"
            icon="add user"
            color="green"
            onClick={() => {
              openModal(<CustomerForm submitHandler={handleCreateorEdit} />)
            }}
          />
        </Segment>
        <Container textAlign="center">
          <Grid columns="3">
            <Grid.Column width="3" />
            <Grid.Column width="10">{customersArea}</Grid.Column>
            <Grid.Column width="3" />
          </Grid>
        </Container>
      </Segment>
    </>
  )
}

Customers.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default connect(null, actions)(Customers)

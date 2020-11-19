import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'

import CustomerService from '../../app/api/customerService'
import DishService from '../../app/api/dishService'
import InvoiceService from '../../app/api/invoiceService'
import LoadingComponent from '../../components/common/LoadingComponent'

const InvoiceDetails = ({ match }) => {
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchInvoice = useCallback(async () => {
    setLoading(true)
    
    try {
      const invoice = await InvoiceService.fetchInvoice(match.params.id)
      if (invoice) {
        const customer = await CustomerService.fetchCustomer(invoice.estudiante.id)

        const items = []
        if (invoice.cursos.length > 0) {
          invoice.cursos.forEach((item) => {
            console.log("item",item.curso)
            DishService.fetchDish(item.curso.id)
              .then((response) => {
                if (response) {
                  const dishItem = {
                    name: response.nombre,
                    siglas: response.siglas,
                    id: response.id,
                  }
                  items.push(dishItem)
                }

                
                const invoiceDetail = {
                  id: invoice.id,
                  customer,
                  items,
                  createdAt: new Date(invoice.fechaMatricula).toLocaleDateString(),
                }
                setInvoice(invoiceDetail)
              })
              .catch((error) => toast.error(error))
          })
        }
      }
      setLoading(false)
    } catch (error) {
      console.error("Error carga de matricula: ",error)
      setLoading(false)
      toast.error(error)
    }
  }, [match.params.id])

  useEffect(() => {
    fetchInvoice()
  }, [fetchInvoice])

  if (loading) return <LoadingComponent content="Loading Invoice Details..." />
  let invoiceDetailedArea = <h4>Detalle de Matrícula</h4>

  if (invoice) {
    invoiceDetailedArea = (
      <Segment.Group>
        <Segment>
          <Header as="h4" block color="violet">
            Estudiante
          </Header>
        </Segment>
        <Segment.Group>
          <Segment>
            <p>
              <strong>Name: </strong>
              {`${invoice.customer.nombres} ${invoice.customer.apellidos}`}
            </p>
          </Segment>
        </Segment.Group>
        <Segment>
          <Header as="h4" block color="violet">
            Matricula
          </Header>
        </Segment>
        <Segment.Group>
          <Segment>
            <p>
              <strong>Código: </strong>
              {invoice.id}
            </p>
            <p>
              <strong>Fecha de matricula: </strong>
              {invoice.createdAt}
            </p>
          </Segment>
        </Segment.Group>
        <Segment>
          <Table celled striped color="violet">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="code" />
                  Cursos
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>sigla</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {invoice.items.length > 0 &&
                invoice.items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.siglas}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
         
        </Segment>
      </Segment.Group>
    )
  }

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Matricula</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/invoices">
          Listado de matriculas
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Detalle de matricula</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="address card outline" />
          Detalle de matricula
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{invoiceDetailedArea}</Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

InvoiceDetails.propTypes = {
  match: PropTypes.object.isRequired,
}

export default InvoiceDetails

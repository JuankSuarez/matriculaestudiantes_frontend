import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import InvoiceService from '../../app/api/invoiceService'
import LoadingComponent from '../../components/common/LoadingComponent'

const Invoices = ({ history }) => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInvoices = useCallback(async () => {
    setLoading(true)
    try {
      const invoices = await InvoiceService.fetchInvoices()
      if (invoices) setInvoices(invoices)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }, [])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  let invoicesList = <h4>Nohay matrículas registradas</h4>

  if (invoices && invoices.length > 0) {
    
    invoicesList = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5">Fecha matrícula</Table.HeaderCell>
            <Table.HeaderCell width="3" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell>{new Date(invoice.fechaMatricula).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Detalle matrícula"
                  trigger={
                    <Button
                      color="violet"
                      icon="address card outline"
                      onClick={() => {
                        history.push(`/invoice/${invoice.id}`)
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

  if (loading) return <LoadingComponent content="Cargando matriculas..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Matricula</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>listado de matriculas</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Matriculas
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{invoicesList}</Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

Invoices.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Invoices

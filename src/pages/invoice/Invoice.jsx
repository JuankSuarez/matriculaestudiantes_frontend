import React from 'react'

import { Breadcrumb, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import InvoiceForm from '../../components/invoice/InvoiceForm'

// import InvoiceForm from '../../components/invoice/InvoiceForm'

const Invoice = () => {
  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Matricula</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/invoices">
          Litado Matriculas
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Nueva Matricula</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="address card outline" />
          Detalle de Matricula
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">
            <InvoiceForm />
          </Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

export default Invoice

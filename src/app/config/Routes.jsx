import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import NotFound from '../../components/common/NotFound'
import Navbar from '../../components/navbar/Navbar'
import Estudiantes from '../../pages/customers/Estudiantes'
import Cursos from '../../pages/dishes/Cursos'
import HomePage from '../../pages/home/HomePage'
import Invoice from '../../pages/invoice/Invoice'
import Invoices from '../../pages/invoice/Invoices'
import InvoiceDetails from '../../pages/invoice/InvoiceDetails'

const Routes = ({ authenticated }) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      {authenticated && (
        <Route
          path="/(.+)"
          render={() => (
            <>
              <Navbar />
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/estudiantes" component={Estudiantes} />
                  <Route path="/cursos" component={Cursos} />
                  <Route path="/newInvoice" component={Invoice} />
                  <Route path="/invoice/:id" component={InvoiceDetails} />
                  <Route path="/invoices" component={Invoices} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          )}
        />
      )}
    </>
  )
}

Routes.propTypes = {
  authenticated: PropTypes.bool,
}

Routes.defaultProps = {
  authenticated: false,
}

export default withRouter(Routes)

import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Grid, Item, Header, Icon } from 'semantic-ui-react'

const CustomerHeader = ({ customer }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={customer.urlFoto || '/assets/user.png'} />
              <Item.Content verticalAlign="middle">
                <Header as="h1">
                  {customer.nombres} {customer.apellidos}
                </Header>
                <br />
                <Icon name="calendar alternate outline" />
                <Header as="h3">{customer.fechaNac}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

CustomerHeader.propTypes = {
  customer: PropTypes.object.isRequired,
}

export default CustomerHeader

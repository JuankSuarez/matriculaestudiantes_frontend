import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we&apos;ve looked everywhere but couldn&apos;t find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/dishes" primary>
          Return to the dishes List
        </Button>
      </Segment.Inline>
    </Segment>
  )
}

export default NotFound

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { getJwt } from '../../app/config/auth/credentials'
import { openModal } from '../../app/store/actions/modalActions'
import LoginForm from '../../components/auth/LoginForm'

const mapState = (state) => ({
  currentUser: state.auth.currentUser,
  token: getJwt(),
})

const actions = {
  openModal,
}

const HomePage = ({ currentUser, token, openModal }) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Icon name="code" /> Colegio FullStack
        </Header>
        {currentUser && token ? (
          <>
            <Header as="h2" inverted content="bievenido a la mejor academia" />
            <Button as={Link} to="/cursos" size="huge" inverted>
              Entrar a la academia
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Bienvenido a la mejor academia" />
            <Button onClick={() => openModal(<LoginForm />)} size="huge" inverted>
              Login
            </Button>
          </>
        )}
      </Container>
    </Segment>
  )
}

HomePage.propTypes = {
  openModal: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  token: PropTypes.string,
}

HomePage.defaultProps = {
  currentUser: null,
  token: null,
}

export default connect(mapState, actions)(HomePage)

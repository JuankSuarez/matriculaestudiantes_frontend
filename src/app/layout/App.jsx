import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import LoadingComponent from '../../components/common/LoadingComponent'
import ModalContainer from '../../components/modal/ModalContainer'
import { getJwt } from '../config/auth/credentials'
import Routes from '../config/Routes'
// import Todos from '../../pages/todos/Todos'
import { getUser } from '../store/actions/authActions'

const actions = {
  getUser,
}

const mapState = (state) => ({
  authenticated: state.auth.authenticated,
})

const App = ({ getUser, authenticated }) => {
  const [appLoaded, setAppLoaded] = useState(false)

  useEffect(() => {
    const token = getJwt()
    if (token) {
      getUser()
    }
    setAppLoaded(true)
  }, [getUser])

  if (!appLoaded) return <LoadingComponent content="Loading App.." />

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Routes authenticated={authenticated} />
    </>
  )
}

App.propTypes = {
  getUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
}

App.defaultProps = {
  authenticated: false,
}

export default connect(mapState, actions)(App)

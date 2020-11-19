import React, { useEffect } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchDishes, deleteDish } from '../../app/store/actions/dishActions'
import { openModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import DishesForm from '../../components/dishes/DishesForm'

const actions = {
  fetchDishes,
  openModal,
  deleteDish,
}

const mapState = (state) => ({
  dishes: state.dish.dishes,
  loading: state.dish.loadingDishes,
  loadingDish: state.dish.loadingDish,
})

const Dishes = ({ fetchDishes, dishes, openModal, loading, loadingDish, deleteDish }) => {
  useEffect(() => {
    fetchDishes()
  }, [fetchDishes])

  let dishList = <h4>No hay cursos disponibles en la academia.</h4>

  if (dishes && dishes.length > 0) {
    dishList = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5">Curso</Table.HeaderCell>
            <Table.HeaderCell width="2">Siglas</Table.HeaderCell>
            <Table.HeaderCell width="2" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dishes.map((curso) => (
            <Table.Row key={curso.id}>
              <Table.Cell>{curso.nombre}</Table.Cell>
              <Table.Cell>{curso.siglas}</Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Editar Curso"
                  trigger={
                    <Button
                      basic
                      color="violet"
                      icon="edit"
                      loading={loadingDish}
                      onClick={() => {
                        openModal(<DishesForm id={curso.id} />)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Eliminar curso"
                  trigger={
                    <Button
                      basic
                      color="red"
                      icon="trash"
                      loading={loadingDish}
                      onClick={() => {
                        deleteDish(curso.id)
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

  if (loading) return <LoadingComponent content="Loading Courses..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Resources</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Cursos</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Lista de Cursos
        </Header>
      </Divider>
      <Segment>
        <Button
          size="large"
          content="Nuevo curso"
          icon="add"
          color="green"
          onClick={() => {
            openModal(<DishesForm />)
          }}
        />
      </Segment>
      <Container>
        <Grid.Column columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{dishList}</Grid.Column>
          <Grid.Column width="3" />
        </Grid.Column>
      </Container>
    </Segment>
  )
}

Dishes.propTypes = {
  fetchDishes: PropTypes.func.isRequired,
  dishes: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingDish: PropTypes.bool.isRequired,
  deleteDish: PropTypes.func.isRequired,
}

export default connect(mapState, actions)(Dishes)

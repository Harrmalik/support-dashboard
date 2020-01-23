// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectCustomer } from 'actions'
import './HomePage.css';
import { Segment, Table, Button, Header, Input, Icon } from 'semantic-ui-react';

// Pages

class HomePage extends React.Component {
    render() {
        return (
            <div id="home">
              { this.props.loading ? <LoadingScreen/> : <DetailView customer={this.props.customer}/> }
            </div>
        )
    }
}

let LoadingScreen = () => {
  return (
    <Segment>
      Laoding
    </Segment>
  )
}

const DetailView = (props) => {
  return (
    <Segment>
      <Header>User Data</Header>
      <Table celled selectable compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Info</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>


        <Table.Body>
          { props.customer.payments.map(p => {
            return (
              <Table.Row key={p.id}>
                <Table.Cell>{p.info}</Table.Cell>
                <Table.Cell>{p.price}</Table.Cell>
                <Table.Cell>{p.date}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Segment>
  )
}

const mapStateToProps = state => ({
    user: state.user,
    customer: state.customer,
    loading: state.loading
})

const mapDispatchToProps = dispatch => ({
    selectCustomer: bindActionCreators(selectCustomer, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

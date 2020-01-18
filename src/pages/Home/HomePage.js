// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectCustomer } from '../../actions'

// Pages

class HomePage extends React.Component {
    render() {
        return (
            <div id="home">

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    customer: state.customer,
    predefinedMessages: state.predefinedMessages
})

const mapDispatchToProps = dispatch => ({
    selectCustomer: bindActionCreators(selectCustomer, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

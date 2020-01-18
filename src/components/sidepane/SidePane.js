// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectCustomer,setPredefinedMessages, setSavedTags } from '../../actions'
import { Menu, Button, Header, Input, Icon } from 'semantic-ui-react';
import './SidePane.css';

class SidePane extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        search: props.match.params.tag,
        savedTags: [],
        recentTags: [],
        loading: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.searchTag = this.searchTag.bind(this);
      this.changeUrl = this.changeUrl.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match && newProps.match.params.tag !== newProps.customer.currentplan) {
      if (this.props.customer.searchTerm && !newProps.customer.searchTerm) {

      } else if (newProps.match.params.tag !== newProps.customer.searchTerm) {
        this.searchTag({
          target: {
            value: newProps.match.params.tag
          }
        })
      }
    }
  }

  searchTag(e) {
    this.props.selectCustomer({searchTerm: this.state.query});
  }

  changeUrl(e) {
    let tag = null

    if (e.type === 'keydown') {
      if (e.key === 'Enter') tag = this.state.query;
    } else {
      tag = e.target.value ? e.target.value : e.target.innerText !== "Search" ? e.target.innerText : this.state.query;
    }

    if (tag) {
      window.location.hash = `#/lookup/${tag}`;
    } else if (e.type === 'keydown') {
      // Do nothing
    } else {
      this.props.selectCustomer({})
      window.location.hash=`#/`;
    }

  }

  render() {
      return (
        <Menu id="SidePane" inverted vertical>
          <Menu.Item>
            <Header inverted>
              Support Dashboard
              <Header sub>React App</Header>
            </Header>
          </Menu.Item>

          <Menu.Item>
            <Input name="query" icon='search' placeholder='Search customer...' onChange={this.handleChange} />
            <Button fluid color="teal" onClick={this.searchTag}>Search</Button>

            <Button fluid>Find tag by customer info</Button>
          </Menu.Item>



          <div id="sub-menu">
            <Menu.Item onClick={()=> {}}>
              Malik Harrison
            </Menu.Item>

            <Menu.Item onClick={()=> {}}>
              Log In
              <Icon name='sign in' />
            </Menu.Item>
          </div>
        </Menu>

      )
  }
}

const mapStateToProps = state => ({
    user: state.user,
    customer: state.customer,
    savedTags: state.savedTags
});

const mapDispatchToProps = dispatch => ({
    selectCustomer: bindActionCreators(selectCustomer, dispatch),
    setPredefinedMessages: bindActionCreators(setPredefinedMessages, dispatch),
    setSavedTags: bindActionCreators(setSavedTags, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePane);

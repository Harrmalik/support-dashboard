// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectCustomer,setPredefinedMessages, setSavedTags, setLoading } from 'actions'
import { Menu, Button, Header, Input, Icon } from 'semantic-ui-react';
import './SidePane.css';

class SidePane extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        search: props.match.params.tag,
        savedTags: [],
        recentTags: [],
        loading: props.loading
      };

      this.handleChange = this.handleChange.bind(this);
      this.searchTag = this.searchTag.bind(this);
      this.clearUser = this.clearUser.bind(this);

      if (props.match.params.tag) {
        this.searchTag(props.match.params.tag);
      }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  searchTag(e) {
    let searchTerm = e.target ? this.state.query : e;
    window.location.hash = `#/lookup/${searchTerm}`;
    this.props.setLoading(true);

    fetch(`https://pdzhlkjzid.execute-api.us-east-1.amazonaws.com/dev/user/get?searchTerm=${searchTerm}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.user
        });

        this.props.selectCustomer(result.user)
        this.props.setLoading(false);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        this.props.setLoading(false);
      }
    );
  }

  clearUser() {
    window.location.hash = `#/`;
    this.props.selectCustomer(null)
  }

  render() {
      return (
        <Menu id="SidePane" inverted vertical>
          <Menu.Item onClick={this.clearUser}>
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

          <Menu.Item>
            <Header inverted>Saved Customers</Header>
          </Menu.Item>

          <Menu.Item link onClick={() => {this.searchTag('malik')}}>
            Malik
          </Menu.Item>

          <Menu.Item link onClick={() => {this.searchTag('sam')}}>
            Sam
          </Menu.Item>

          <Menu.Item link onClick={() => {this.searchTag('jess')}}>
            Jess
          </Menu.Item>


          <div id="sub-menu">
            <Menu.Item onClick={()=> {}}>
              Malik Harrison
            </Menu.Item>
          </div>
        </Menu>

      )
  }
}

const mapStateToProps = state => ({
    user: state.user,
    customer: state.customer,
    savedTags: state.savedTags,
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    selectCustomer: bindActionCreators(selectCustomer, dispatch),
    setPredefinedMessages: bindActionCreators(setPredefinedMessages, dispatch),
    setSavedTags: bindActionCreators(setSavedTags, dispatch),
    setLoading: bindActionCreators(setLoading, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePane);

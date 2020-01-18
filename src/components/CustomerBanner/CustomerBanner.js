// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addTag } from '../../actions'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import $ from 'jquery';
import './CustomerBanner.css';

let swal = {};
let iziToast = {};

class CustomerBanner extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        console.log(props)

        this.saveTag = this.saveTag.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
        this.cancelPlan = this.cancelPlan.bind(this)
        this.makeRate = this.makeRate.bind(this)
        this.upgradePlan = this.upgradePlan.bind(this)
        this.downgradePlan = this.downgradePlan.bind(this)
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    showMessage() {
      iziToast.show({
          theme: 'dark',
          message: 'Copied!'
      })
    }

    saveTag() {
      let component = this
      $.ajax({
        url: './main.php',
        method: 'post',
        data: {
          module: 'apiHandler',
          action: 'saveTag',
          userId: this.props.user.userId,
          unlimited: this.props.customer.currentplan
        }
      }).done((res) => {
        iziToast.show({
            theme: 'dark',
            message: `Added to saved tags`
        })
        component.props.addTag({
          unlimited: this.props.customer.currentplan
        })
      })
    }

    deleteTag(e) {
      let component = this
      $.ajax({
        url: './main.php',
        method: 'post',
        data: {
          module: 'apiHandler',
          action: 'deleteTag',
          savedtagid: e.target.id
        }
      }).done((res) => {
        iziToast.show({
            theme: 'dark',
            message: `Deleted tag`
        })
        component.props.removeTag({
          unlimited: this.props.customer.currentplan
        })
      })
    }

    cancelPlan() {
      let component = this,
          customer = component.props.customer

      swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Nevermind',
        confirmButtonText: 'Yes, cancel it!',
        backdrop: false
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: './main.php',
            method: 'post',
            data: {
              server: 'cancelunlimited',
              module: 'api',
              action: 'cancelPlan',
              plan: customer.planName,
              tag: customer.currentplan,
              siteId: customer.site,
              customerId: customer.customerId,
              minPrice: customer.lowestPlan > customer.price ? customer.lowestPlan : customer.price,
              reason: customer.reason,
              email: customer.email,
              comment: customer.comment,
              offered: customer.suggestedPlan ? true : false,
              paidmonths: customer.payments.length,
              price: customer.price,
              oldPrice: customer.price,
              lowestPrice: customer.suggestedPlan,
              employeeId: component.props.user.employeeid

            }
          }).done((res) => {
            if (res.message) {
              iziToast.show({
                  theme: 'dark',
                  message: res.message
              })
            }
            iziToast.show({
                theme: 'dark',
                message: `Cancelled ${customer.planName}`
            })
            console.log(res);
          }).error((res) => {
            iziToast.show({
                theme: 'error',
                message: res
            })
          })
        }
      })
    }

    makeRate(e) {
      let component = this,
          id = e.target.id,
          customer = component.props.customer

      swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Nevermind',
        confirmButtonText: 'Yes, lower it!',
        backdrop: false
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: './main.php',
            method: 'post',
            data: {
              server: 'cancelunlimited',
              module: 'api',
              action: 'makeRate',
              plan: customer.currentplan,
              siteId: customer.site,
              customerId: customer.customerId,
              minPrice: customer.lowestPlan > customer.price ? customer.lowestPlan : customer.price,
              reason: customer.reason,
              email: customer.email,
              comment: customer.comment,
              offered: customer.suggestedPlan ? true : false,
              paidmonths: customer.payments.length,
              oldPrice: customer.price,
              lowestPrice: customer.suggestedPlan,
              employeeId: component.props.user.employeeid,
              price: component.props.customer[id]
            }
          }).done((res) => {
            if (res.message) {
              iziToast.show({
                  theme: 'dark',
                  message: res.message
              })
            }
            iziToast.show({
                theme: 'dark',
                message: `Moved to ${res}`
            })
          }).error((res) => {
            iziToast.show({
                theme: 'error',
                message: res.message
            })
          })
        }
      })
    }

    upgradePlan(e) {
      let component = this,
      customer = component.props.customer

      swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Nevermind',
        confirmButtonText: 'Yes, upgrade it!',
        backdrop: false
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: './main.php',
            method: 'post',
            data: {
              server: 'cancelunlimited',
              module: 'api',
              action: 'upgradePlan',
              plan: customer.currentplan,
              site: customer.site,
              customerId: customer.customerId,
              minPrice: customer.lowestPlan > customer.price ? customer.lowestPlan : customer.price,
              reason: customer.reason,
              email: customer.email,
              comment: customer.comment,
              offered: customer.suggestedPlan ? true : false,
              paidmonths: customer.payments.length,
              oldPrice: customer.price,
              lowestPrice: customer.suggestedPlan,
              employeeId: component.props.user.employeeid,
              price: customer.price
            }
          }).done((res) => {
            if (res.message) {
              iziToast.show({
                  theme: 'dark',
                  message: res.message
              })
            }
            iziToast.show({
                theme: 'dark',
                message: `Moved to ${res.newPlan}`
            })
            console.log(res);
          })
        }
      })
    }

    downgradePlan(e) {
      let component = this,
          customer = component.props.customer

      swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Nevermind',
        confirmButtonText: 'Yes, downgrade it!',
        backdrop: false
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: './main.php',
            method: 'post',
            data: {
              server: 'cancelunlimited',
              module: 'api',
              action: 'downgradePlan',
              plan: customer.currentplan,
              site: customer.site,
              customerId: customer.customerId,
              minPrice: customer.lowestPlan > customer.price ? customer.lowestPlan : customer.price,
              reason: customer.reason,
              email: customer.email,
              comment: customer.comment,
              offered: customer.suggestedPlan ? true : false,
              paidmonths: customer.payments.length,
              oldPrice: customer.price,
              lowestPrice: customer.suggestedPlan,
              employeeId: component.props.user.employeeid,
              price: customer.price
            }
          }).done((res) => {
            iziToast.show({
                theme: 'dark',
                message: `Moved to ${res.newPlan}`
            })
            console.log(res);
          })
        }
      })
    }

    render() {
        let customer = this.props.customer,
            backgroundImage = ''

        console.log(customer);


        if (customer && customer.searchTerm) {
          switch (customer.style) {
            case 'greenbg': backgroundImage = 'linear-gradient(to right, rgb(27, 218, 112), rgb(27, 218, 112))'; break;
            case 'redbg': backgroundImage = 'linear-gradient(to right,#ff8a00,#da1b60)'; break;
            case 'yellowbg': backgroundImage = 'linear-gradient(to right, rgb(255, 200, 0), rgb(255, 141, 0))'; break;
            default: backgroundImage = 'linear-gradient(to right, rgb(158, 229, 245), rgb(21, 160, 241))'
          }

          let savedTag = this.props.savedTags.find((t) => {
            return t.unlimited === this.props.customer.searchTerm
          })

          return (
            <section id="CustomerBanner" className="hero hero-page gray-bg padding-small" style={{backgroundImage}}>
              <div className="container">
                <div className="row d-flex">
                  <div className="col-lg-10 order-2 order-lg-1">
                    <h1 id="vendorName" className="ui header" style={{fontSize:"3.5rem"}}>
                        {customer.currentplan}
                        <CopyToClipboard text={customer.currentplan} onCopy={this.showMessage}>
                          <span className="ui black label"><i className="fa fa-copy"></i></span>
                        </CopyToClipboard>
                        <span className="sub header">
                          <CopyToClipboard text={customer.planName} onCopy={this.showMessage}>
                            <span className="ui basic label">Plan: {customer.planName}</span>
                          </CopyToClipboard>
                          <CopyToClipboard text={customer.license} onCopy={this.showMessage}>
                            <span className="ui basic label">License: {customer.license}</span>
                          </CopyToClipboard>
                          <CopyToClipboard text={customer.site} onCopy={this.showMessage}>
                            <span className="ui basic label">Site: {customer.site}, {customer.state}</span>
                          </CopyToClipboard>
                          <CopyToClipboard text={customer.card} onCopy={this.showMessage}>
                            <span className="ui basic label">CC: {customer.card}</span>
                          </CopyToClipboard>
                          <CopyToClipboard text={`${customer.firstName} ${customer.lastName}`} onCopy={this.showMessage}>
                            <span className="ui basic label">Name: {`${customer.firstName} ${customer.lastName}`}</span>
                          </CopyToClipboard>
                          <CopyToClipboard text={customer.email} onCopy={this.showMessage}>
                            <span className="ui basic label">Email: {customer.email}</span>
                          </CopyToClipboard>
                        </span>
                    </h1>
                  </div>
                  <div className="col-lg-2 text-right order-1 order-lg-2">
                    <ul className="breadcrumb justify-content-lg-end" style={{background:"none", float:'left'}}>
                      <li className="breadcrumb-item">
                        <div id="quick-actions" className="btn-group">
                          <div class="ui black action button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</div>
                          <div className="dropdown-menu">
                            <span className="dropdown-item" onClick={this.cancelPlan}>Discontinue Plan</span>
                            {customer.lowestPlan > 0 ? <span id="lowestPlan" className="dropdown-item" onClick={this.makeRate}>Lower Rate -Lowest</span> : null}
                            {customer.suggestedPlan ? <span id="suggestedPlan" className="dropdown-item" onClick={this.makeRate}>Lower Rate -Suggested</span> : null}
                            {customer.isSK && customer.payments.length > 2 ? <span className="dropdown-item" onClick={this.downgradePlan}>Downgrade Plan</span> : null}
                            {!customer.isSK ? <span className="dropdown-item" onClick={this.upgradePlan}>Upgrade Plan</span> : null}
                            {!savedTag ? <span className="dropdown-item" onClick={this.saveTag}>Add to sidebar</span> : <span id={savedTag.savedtagid} className="dropdown-item" onClick={this.deleteTag}>Remove for sidebar</span>}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row d-flex">
                  <div className="col-lg-12">
                    <hr></hr>
                    <div id="stats">
                        <div className="statistics thirds">
                            <div className="white value">
                                <span id="numOrders">{this.props.customer.average}</span>
                            </div>
                            <div className="label">
                                12M Avg
                            </div>
                        </div>

                        <div className="statistics thirds">
                            <div className="white value">
                                $<span id="total">{this.props.customer.price}</span>
                            </div>
                            <div className="label">
                                Current Price
                            </div>
                        </div>

                        <div className="statistics thirds">
                            <div className="white value">
                                <span id="pending">{this.props.customer.lowestPlan} {this.props.customer.suggestedPlan ? '-' : '' } {this.props.customer.suggestedPlan}</span>
                            </div>
                            <div className="label">
                                Suggested Price
                            </div>
                        </div>

                    </div>
                    <hr></hr>
                  </div>
                </div>
              </div>
            </section>
          )
        } else {
          return (
            <section style={{position:'absolute', top:'45%', width: '80%'}}>
              <h2 className="ui icon header" style={{marginLeft:'25%', width: '65%', color: '#232939'}}>
                <i className="search icon"></i>
                <div className="content">
                  Support Dashboard
                  <div className="sub header"></div>
                </div>
              </h2>
            </section>
          )
        }
    }
}

const mapStateToProps = state => ({
    user: state.user,
    customer: state.customer,
    savedTags: state.savedTags
})

const mapDispatchToProps = dispatch => ({
  addTag: bindActionCreators(addTag, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerBanner)

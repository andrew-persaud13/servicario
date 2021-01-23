import React, { Component } from 'react';
import { connect } from 'react-redux'
import Routes from './Routes'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Spinner from 'components/Spinner';

import { logout } from './actions'

class ServiceApp extends Component {

  onLogout = () => this.props.dispatch(logout())
  
  renderApplication(auth) {
    return (
      <>
        <Sidebar />
        <Navbar id="navbar-main" auth={auth} logout={this.onLogout} />
        <Navbar id="navbar-clone" auth={auth} logout={this.onLogout} />
        <Routes />
      </>
    )
  }
  render() {
    const { auth } = this.props
    return (
      auth && auth.isAuthResolved ? this.renderApplication(auth) : <Spinner />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(ServiceApp);
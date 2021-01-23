import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

const withGuest =  Component => {
  class WithGuest extends React.Component {


    render() {
      const { auth, dispatch, ...rest } = this.props
      return !auth.isAuth  ?  <Component {...rest} /> : <Redirect  to="/" />
    }
  }

  const mapStateToProps = ({ auth }) => ({
    auth
  })

  return connect(mapStateToProps)(WithGuest) 
};

export default withGuest;
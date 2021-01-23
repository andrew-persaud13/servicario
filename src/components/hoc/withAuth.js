import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

const withAuth =  Component => {
  class WithAuth extends React.Component {


    render() {
      const { auth, dispatch, ...rest } = this.props
      return auth.isAuth  ?  <Component auth={auth} {...rest} /> : <Redirect  to="/login" />
    }
  }

  const mapStateToProps = ({ auth }) => ({
    auth
  })

  return connect(mapStateToProps)(WithAuth) 
};

export default withAuth;
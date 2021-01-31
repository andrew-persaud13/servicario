/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import RegisterForm from 'components/auth/RegisterForm';
import { registerUser } from '../actions';
import withGuest from '../components/hoc/withGuest';

const Register = () => {
  const { addToast } = useToasts();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRegisterSubmit = formData => {
    registerUser(formData)
      .then(_ => {
        addToast('Successfully registered!', {
          appearance: 'success',
          autoDismiss: 3000,
        });
        setShouldRedirect(true);
      })
      .catch(error =>
        addToast(error, { appearance: 'error', autoDismiss: 3000 })
      );
  };

  if (shouldRedirect) return <Redirect to='/' />;

  return (
    <div className='auth-page'>
      <div className='container has-text-centered'>
        <div className='column is-4 is-offset-4'>
          <h3 className='title has-text-grey'>Register</h3>
          <p className='subtitle has-text-grey'>Please Register to proceed.</p>
          <div className='box'>
            <figure className='avatar'>
              <img src='https://placehold.it/128x128' alt='avatar' />
            </figure>
            <RegisterForm onRegister={handleRegisterSubmit} />
          </div>
          <p className='has-text-grey'>
            <a>Sign In With Google</a>&nbsp;
            <a href='/'>Sign Up</a> &nbsp;·&nbsp;
            <a href='../'>Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withGuest(Register);

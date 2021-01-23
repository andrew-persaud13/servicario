/* eslint no-useless-escape: 0 */
import React from 'react';

import { useForm } from 'react-hook-form'

const LoginForm = ({ onLogin }) => {

  const { register, handleSubmit, errors } = useForm()

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <div className="field">
        <div className="control">
          <input className="input is-large"
                type="email"
                name="email"
                ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })}
                placeholder="Your Email"
                autoFocus=""
                autoComplete="email" />
         {  errors.email &&
            <div className="form-error">
              {errors.email.type === 'required' && <span className="help is-danger">Email is required</span>}
              {errors.email.type === 'pattern' && <span className="help is-danger">Email address is not valid</span>}
            </div>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input className="input is-large"
                type="password"
                name="password"
                ref={register({ required: true})}
                placeholder="Your Password"
                autoComplete="current-password" />
        { errors.password &&  
          <div className="form-error">
            { errors.password.type === 'required' && <span className="help is-danger">Password is required</span>}
          </div>}
        </div>
      </div>
      <button
        type="submit"
        className="button is-block is-info is-large is-fullwidth">Sign In</button>
  </form>
  );
};

export default LoginForm;
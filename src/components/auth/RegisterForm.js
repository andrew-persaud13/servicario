/* eslint no-useless-escape: 0 */


import React from 'react';
import {  useForm } from 'react-hook-form'

import { isValidImage, isValidUrl, sameAs } from '../../helpers/validators'

const RegisterForm = ({ onRegister }) => {
  const { register, handleSubmit, errors, getValues } = useForm()



  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <div className="field">
        <div className="control">
          <input name="email"
            ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })}
            className="input is-large"
            type="email"
            name="email"
            placeholder="Your Email"
            autoFocus=""
            autoComplete="email" />
          { errors && errors.email &&
            <div className="form-error">
              {errors.email.type === 'required' && <span className="help is-danger">Email is required</span>}
              {errors.email.type === 'pattern' && <span className="help is-danger">Email address is not valid</span>}
            </div>
          }
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="fullName"
            ref={register({ required: true })}
            className="input is-large"
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoFocus=""/>
          { errors && errors.fullName &&
            <div className="form-error">
              { errors.fullName.type === 'required' && <span className="help is-danger">Name is required</span>}
            </div>
          }
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="avatar"
            className="input is-large"
            name="avatar"
            ref={register({ required: true, validate: { isValidImage, isValidUrl } })}
            type="text"
            placeholder="Avatar"
            autoFocus=""/>
          { errors && errors.avatar &&
            <div className="form-error">
              {errors.avatar.type === 'required' && <span className="help is-danger">Avatar is required</span>}
              {(errors.avatar.type === 'isValidImage' || 
                errors.avatar.type === 'isValidUrl') && 
                <span className="help is-danger">Avatar is not valid</span>
              }
            </div>
          }
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="password"
            ref={register({ required: true, minLength: 6 })}
            className="input is-large"
            name="password"
            type="password"
            placeholder="Your Password"
            autoComplete="current-password" />
          { errors && errors.password &&
            <div className="form-error">
              {  errors.password.type === 'required' && <span className="help is-danger">Password is required</span>}
              {  errors.password.type === 'minLength' && <span className="help is-danger">Password must be at least 6 characters.</span>}
            </div>
          }
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input name="passwordConfirmation"
            ref={register({ required: true, minLength: 6, validate: { sameAs: sameAs(getValues, 'password')  } })}
            className="input is-large"
            name="passwordConfirmation"
            type="password"
            placeholder="Repeat Password"
            autoComplete="current-password" />
          { errors && errors.passwordConfirmation &&
            <div className="form-error">
              {  errors.passwordConfirmation.type === 'required' && <span className="help is-danger">Password is required</span>}
              {  errors.passwordConfirmation.type === 'minLength' && <span className="help is-danger">Password must be at least 6 characters.</span>}
              {  errors.passwordConfirmation.type === 'sameAs' && <span className="help is-danger">Passwords must match.</span>}
            </div>
          }
        </div>
      </div>
      <button
        type="submit"
        className="button is-block is-info is-large is-fullwidth">Register</button>
  </form>
  );
};

export default RegisterForm;
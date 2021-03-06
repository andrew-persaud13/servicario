import { SET_AUTH_USER, RESET_AUTH_STATE } from '../types';

import * as api from 'api';

export const registerUser = formData => api.register(formData);
export const loginUser = formData => api.login(formData);
export const onAuthStateChanged = onAuthCallback =>
  api.onAuthStateChanged(onAuthCallback);

export const logout = uid => dispatch => {
  debugger;
  api.setUserOnlineStatus(uid, false);
  api.logout().then(_ => dispatch({ user: null, type: SET_AUTH_USER }));
};

export const storeAuthUser = authUser => dispatch => {
  dispatch(resetAuthState());
  if (authUser) {
    return api
      .getUserProfile(authUser.uid)
      .then(userWithProfile =>
        dispatch({ type: SET_AUTH_USER, user: userWithProfile })
      );
  }

  dispatch({ type: SET_AUTH_USER, user: null });
};

export const resetAuthState = () => ({ type: RESET_AUTH_STATE });

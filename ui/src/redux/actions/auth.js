import { get, some } from 'lodash';

import { fetchWithoutToken } from '../../utilities/fetch';
import {
  SET_LOGIN_DID_ERROR,
  SET_LOGIN_INPUT_ERRORS,
  SET_LOGIN_LOADING,
  SET_REGISTER_DID_ERROR,
  SET_REGISTER_INPUT_ERRORS,
  SET_REGISTER_LOADING,
  SET_USER
} from '../actionTypes.js/auth';

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function setRegisterLoading(status) {
  return {
    type: SET_REGISTER_LOADING,
    status
  };
}

export function setRegisterDidError(didError) {
  return {
    type: SET_REGISTER_DID_ERROR,
    didError
  };
}

export function setRegisterInputErrors(inputErrors) {
  return {
    type: SET_REGISTER_INPUT_ERRORS,
    inputErrors
  };
}

export function setLoginLoading(status) {
  return {
    type: SET_LOGIN_LOADING,
    status
  };
}

export function setLoginDidError(didError) {
  return {
    type: SET_LOGIN_DID_ERROR,
    didError
  };
}

export function setLoginInputErrors(inputErrors) {
  return {
    type: SET_LOGIN_INPUT_ERRORS,
    inputErrors
  };
}

export function registerUser({
  username,
  email,
  password,
  password2,
  history
}) {
  return async (dispatch) => {
    dispatch(setRegisterLoading(true));

    const registrationResponse = await fetchWithoutToken(
      '/api/users/register/',
      'POST',
      { username, email, password, password2}  
    )

    if (
      !registrationResponse.success
      || registrationResponse.status >= 400
    ) {
      dispatch(setRegisterDidError(true));

      const inputErrors = {
        username: get(registrationResponse, 'payload.username'),
        email: get(registrationResponse, 'payload.email'),
        password: get(registrationResponse, 'payload.password'),
        password2: get(registrationResponse, 'payload.password2'),
      }

      if (some(inputErrors)) {
        dispatch(setRegisterInputErrors(inputErrors));
      }

      return dispatch(setRegisterLoading(false));
    }

    history.push('/login');
    return dispatch(setRegisterLoading(false));
  }
}

export function logInUser({ email, password, history }) {
  return async (dispatch) => {
    dispatch(setLoginLoading(true));

    const loginResponse = await fetchWithoutToken(
      '/api/users/login/',
      'POST',
      { email, password }
    );
    console.log(loginResponse);
    if (
      !loginResponse.success
      || loginResponse.status >= 400
      || !get(loginResponse, 'payload.token')
    ) {
      dispatch(setLoginDidError(true));

      const inputErrors = {
        email: get(loginResponse, 'payload.email'),
        password: get(loginResponse, 'payload.password'),
      }

      if (some(inputErrors)) {
        dispatch(setLoginInputErrors(inputErrors));
      }

      return dispatch(setLoginLoading(false));
    }

    localStorage.setItem('token', loginResponse.payload.token)
    history.push('/app');
    return dispatch(setLoginLoading(false));
  }
}
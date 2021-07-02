import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { loginUser } from './actions';
import LoginView from './view';

function Login ({ history }) {
  const [formErrors, setFormErrors] = useState({});
  
  const submit = ({ username, password }) => {
    loginUser({ username, password })
      .then((loginResponse) => {
        if (!loginResponse.success) {
          if (loginResponse.formError) {
            return setFormErrors(loginResponse.formErrors);
          }
          return history.push('/error');
        }
    
        localStorage.setItem('token', loginResponse.token)
        history.push('/app');
      });
  }

  return (
    <LoginView
      formErrors={formErrors}
      submit={submit}
    />
  );
}

export default withRouter(Login);
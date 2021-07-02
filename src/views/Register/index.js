import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { registerUser } from './actions';
import RegisterView from './view';

function Register({ history }) {
  const [formErrors, setFormErrors] = useState({});

  const submit = ({ username, password, password2 }) => {
    registerUser({ username, password, password2 })
      .then((registrationResponse) => {
        if (!registrationResponse.success) {
          if (registrationResponse.formError) {
            return setFormErrors(registrationResponse.formErrors);
          }
          return history.push('/error');
        }
    
        history.push('/login');
      });
  }

  return (
    <RegisterView
      formErrors={formErrors}
      submit={submit}
    />
  );
}

export default withRouter(Register);
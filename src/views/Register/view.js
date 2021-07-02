import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import RegisterForm from './RegisterForm';

function RegisterView({
  formErrors,
  submit
}) {
  return (
    <>
      <h1>Sign Up</h1>
      <RegisterForm
        errors={formErrors}
        submit={submit}
      />
      <hr/>
      Have an Account?
      <Link to='/login'>
        <Button
          color='primary'
        >
          Sign In
        </Button>
      </Link>
    </>
  )
}

export default RegisterView;
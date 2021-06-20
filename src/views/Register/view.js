import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';

import RegisterForm from './RegisterForm';

function RegisterView({
  loading,
  formErrors,
  submit
}) {
  if (loading) {
    return <CircularProgress color={'secondary'}/>
  }

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
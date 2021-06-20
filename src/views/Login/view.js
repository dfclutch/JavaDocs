import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';

import LoginForm from './LoginForm';

function LoginView({
  loading,
  formErrors,
  submit
}) {
  if (loading) {
    return <CircularProgress color={'secondary'}/>
  }

  return (
    <>
    <h1>Sign In</h1>
    <LoginForm
      errors={formErrors}
      submit={submit}
    />
    <hr/>
    Need an Account?
    <Link to='/register'>
      <Button
        color='primary'
      >
        Sign Up
      </Button>
    </Link>
  </>
  )
}

export default LoginView;
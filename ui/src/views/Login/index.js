import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';

import { StyledTextInput } from './styles';
import { connect } from 'react-redux';
import { logInUser } from '../../redux/actions/auth';
import { getLoginDidError, getLoginInputErrors, getLoginLoading } from '../../redux/stateSelectors.js/auth';
import { get, isEmpty } from 'lodash';

function buildOnChangeHandler(setterFunction) {
  return (e) => setterFunction(e.target.value);
}

function Login({
  didError,
  inputErrors,
  loading,
  loging
}) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    loging({ email, password, history });
  }

  if (loading) {
    return <CircularProgress color="primary"/>
  }

  if(didError && isEmpty(inputErrors)) {
    return <>Hey sorry, something broke</>
  }

  return (
    <>
      <h1>Log In</h1>
      <form>
        <StyledTextInput
          variant='outlined'
          label='email'
          value={email}
          onChange={buildOnChangeHandler(setEmail)}
          error={didError && inputErrors.email}
          helperText={get(inputErrors,'email','')}
        />
        <StyledTextInput
          variant='outlined'
          label='password'
          value={password}
          onChange={buildOnChangeHandler(setPassword)}
          error={didError && inputErrors.password}
          helperText={get(inputErrors,'password','')}
        />
      </form>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={handleSubmit}
      >
        Log In
      </Button>
      <hr/>
      No Account?
      <Link to='/register'>
        <Button
          color="primary"
        >
          Sign Up
        </Button>
      </Link>
    </>
  );
}

function mapStateToProps(state) {
  return {
    loading: getLoginLoading(state),
    didError: getLoginDidError(state),
    inputErrors: getLoginInputErrors(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loging: ({
      email,
      password,
      history
    }) => dispatch(logInUser({email, password, history}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
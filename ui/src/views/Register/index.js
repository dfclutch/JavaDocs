import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core'; 

import { registerUser } from '../../redux/actions/auth';
import { getRegisterDidError, getRegisterInputErrors, getRegisterLoading } from '../../redux/stateSelectors.js/auth';

import { StyledTextInput } from './styles';
import { get, isEmpty } from 'lodash';

function buildOnChangeHandler(setterFunction) {
  return (e) => setterFunction(e.target.value);
}

function Register({
  didError,
  inputErrors,
  loading,
  registerUser
}) {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  if(loading) {
    return <CircularProgress color="primary"/>
  }

  if(didError && isEmpty(inputErrors)) {
    return <>Hey sorry, something broke</>
  }

  function handleSubmit() {
    registerUser({ username, email, password, password2, history });
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form>
        <StyledTextInput
          variant='outlined'
          label='username'
          value={username}
          onChange={buildOnChangeHandler(setUsername)}
          error={didError && inputErrors.username}
          helperText={get(inputErrors,'username','')}
        />
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
        <StyledTextInput
          variant='outlined'
          label='confirm password'
          value={password2}
          onChange={buildOnChangeHandler(setPassword2)}
          error={didError && inputErrors.password2}
          helperText={get(inputErrors,'password2','')}
        />
      </form>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={handleSubmit}
      >
        Sign Up!
      </Button>
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
  );
}

function mapStateToProps(state) {
  return {
    loading: getRegisterLoading(state),
    didError: getRegisterDidError(state),
    inputErrors: getRegisterInputErrors(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: ({
      username,
      email,
      password,
      password2,
      history
    }) => dispatch(registerUser({ username, email, password, password2, history }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
import React, { useState } from 'react';
import { Button } from '@material-ui/core'; 
import { get } from 'lodash';

import { StyledTextInput } from './styles';

function buildOnChangeHandler(setterFunction) {
  return (e) => setterFunction(e.target.value);
}

function LoginForm({ errors, submit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    submit({ username, password });
  }

  return (
    <>
      <form>
        <StyledTextInput
          variant='outlined'
          label='username'
          value={username}
          onChange={buildOnChangeHandler(setUsername)}
          error={Boolean(errors.username)}
          helperText={get(errors,'username','')}
        />
        <StyledTextInput
          variant='outlined'
          label='password'
          value={password}
          onChange={buildOnChangeHandler(setPassword)}
          error={Boolean(errors.password)}
          helperText={get(errors,'password','')}
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
    </>
  );
}

export default LoginForm;
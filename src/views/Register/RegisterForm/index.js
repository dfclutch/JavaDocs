import React, { useState } from 'react';
import { Button } from '@material-ui/core'; 
import { get } from 'lodash';

import { StyledTextInput } from './styles';

function buildOnChangeHandler(setterFunction) {
  return (e) => setterFunction(e.target.value);
}

function RegisterForm({ errors, submit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    submit({ username, password, password2 });
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
        <StyledTextInput
          variant='outlined'
          label='confirm password'
          value={password2}
          onChange={buildOnChangeHandler(setPassword2)}
          error={Boolean(errors.password2)}
          helperText={get(errors,'password2','')}
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

export default RegisterForm;
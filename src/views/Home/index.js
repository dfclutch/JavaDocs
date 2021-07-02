import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { StyledButton } from './styles';

function Home() {
  if(localStorage.getItem('token')) {
    return <Redirect to="/app"/>
  }

  return (
    <Box>
      <h1>Welcome to JavaDocs</h1>
      <Link to='/login'>
        <StyledButton variant="contained" color="primary">
          Sign In
        </StyledButton>
      </Link>
      <Link to='/register'>
        <StyledButton variant="contained" color="secondary">
          Sign Up
        </StyledButton>
      </Link>
    </Box>
  );
}

export default Home;
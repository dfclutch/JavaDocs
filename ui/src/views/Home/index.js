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
      <StyledButton variant="contained" color="primary">
        <Link to='/login'>Sign In</Link>
      </StyledButton>
      <StyledButton variant="contained" color="secondary">
        <Link to='/register'>Sign Up</Link>
      </StyledButton>
    </Box>
  );
}

export default Home;
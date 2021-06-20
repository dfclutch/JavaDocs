import React from 'react';
import { withRouter } from 'react-router-dom';

import { loginUser, registerUser } from './actions';
import LoginView from './view';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formErrors: {},
      networkError: false
    };
  }

  submit =  async ({ username, password }) => {
    this.setState({ loading: true });
    const loginResponse = await loginUser({ username, password });
    this.setState({ loading: false });

    if (!loginResponse.success || !loginResponse.token) {
      if (loginResponse.formError) {
        return this.setState({ formErrors: loginResponse.formErrors });
      }
      return this.props.history.push('/error');
    }

    localStorage.setItem('token', loginResponse.token)
    this.props.history.push('/app');
  }

  render() {
    return (
      <LoginView
        loading={this.state.loading}
        formErrors={this.state.formErrors}
        submit={this.submit}
      />
    );
  }
}

export default withRouter(Register);
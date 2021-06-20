import React from 'react';
import { withRouter } from 'react-router-dom';

import { registerUser } from './actions';
import RegisterView from './view';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formErrors: {},
      networkError: false
    };
  }

  submit =  async ({ username, password, password2 }) => {
    this.setState({ loading: true });
    const registrationResponse = await registerUser({ username, password, password2 });
    this.setState({ loading: false });

    if (!registrationResponse.success) {
      if (registrationResponse.formError) {
        return this.setState({ formErrors: registrationResponse.formErrors });
      }
      return this.props.history.push('/error');
    }

    this.props.history.push('/login');
  }

  render() {
    return (
      <RegisterView
        loading={this.state.loading}
        formErrors={this.state.formErrors}
        submit={this.submit}
      />
    );
  }
}

export default withRouter(Register);
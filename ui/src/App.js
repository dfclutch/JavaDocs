import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Container, StylesProvider, ThemeProvider } from '@material-ui/core';

import java from './theme/java';
import { AppStyle } from './App.styles';
import store from './redux/store';
import ROUTES, { RenderRoutes } from './routes';

function App() {
  return (
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={java}>
          <Container maxWidth="lg">
            <Router>
              <header>
                <Link to="/"><h1>JavaDocs</h1></Link>
              </header>
              <RenderRoutes routes={ROUTES}/>
            </Router>
          </Container>
          <AppStyle />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;

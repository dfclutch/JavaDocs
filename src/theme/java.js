import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const colors = {
  java: '#734d25',
  sage: '#6e9c82'
};

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: { main: colors.java },
    secondary: { main: colors.sage }
  }
}));

export default theme;
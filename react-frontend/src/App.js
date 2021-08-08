import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/styles.scss'
import themeColors from './styles/colors.scss';


import RedirectRouter from './components/RedirectRouter'
import store from './store'
import {Provider} from 'react-redux'
import {loadUser} from './actions/authActions'

// pick a date util library
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      light: themeColors.primary,
      main: themeColors.secondaryLight,
      dark: themeColors.secondaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      light: themeColors.brightWhite,
      main: themeColors.brightLight,
      dark: themeColors.brightDark,
      contrastText: '#000000',
    },
  },
});

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    const {isAuthenticated} = store.getState().auth
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <RedirectRouter />
        </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;

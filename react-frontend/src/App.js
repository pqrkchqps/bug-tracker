import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/styles.scss'

import RedirectRouter from './components/RedirectRouter'
import store from './store'
import {Provider} from 'react-redux'
import {loadUser} from './actions/authActions'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    const {isAuthenticated} = store.getState().auth
    return (
      <Provider store={store}>
        <RedirectRouter />
      </Provider>
    );
  }
}

export default App;

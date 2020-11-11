import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/styles.scss'
import CreateBugForm from './components/CreateBugForm'
import BugsList from './components/BugsList'
import store from './store'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BugsList />
        <CreateBugForm />
      </div>
    </Provider>
  );
}

export default App;

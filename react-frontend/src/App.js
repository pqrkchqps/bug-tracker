import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/styles.scss'
import CreateBugForm from './components/CreateBugForm'
import BugsList from './components/BugsList'

function App() {
  return (
    <div className="App">
      <BugsList />
      <CreateBugForm />
    </div>
  );
}

export default App;

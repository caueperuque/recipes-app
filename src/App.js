import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </>
  );
}

export default App;

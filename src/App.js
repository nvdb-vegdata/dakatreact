import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ObjektTypeListe from './components/objekttypeliste.js';


class App extends Component {

  render() {

    return (
      <Router>
      <div className="App">
        <div className="Header">
          <h2>Velkommen til datakatalogen light</h2>
        </div>
        <Switch>
          <Route path='/dakatr/:ftid' component={ObjektTypeListe}/>
          <Route path='/dakatr/' component={ObjektTypeListe}/>
        </Switch>
      </div>
    </Router>

    );
  }
}

export default App;

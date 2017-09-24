import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ObjektTypeListe from './components/objekttypeliste.js';


class App extends Component {

  render() {

    return (
      <Router>
      <div className="App">
        <div className="HeaderBar">
          <h1 className="ApplikasjonsOverskrift">Velkommen til datakatalogen light</h1>
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

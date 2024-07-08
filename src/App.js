import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import RouteView from './pages/RouteView';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/route/:id" component={RouteView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
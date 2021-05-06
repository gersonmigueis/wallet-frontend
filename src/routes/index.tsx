import React from 'react';

import { Switch, Route } from 'react-router-dom';

 import Dashboard from '../pages/Dashboard';
 import LevelTwo from '../pages/Grafics/LevelTwo';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/leveltwo" component={LevelTwo} /> 
  </Switch>
);

export default Routes;
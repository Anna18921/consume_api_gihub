import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import User from '../pages/User';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user" component={User} />
    </Switch>
  );
};

export default Routes;

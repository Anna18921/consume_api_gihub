import { Switch, Route } from 'react-router-dom';

import { Home, User } from '../pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user" component={User} />
    </Switch>
  );
};

export default Routes;

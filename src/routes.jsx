import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NewContact from './pages/NewContact/NewContact';
import Edit from './pages/Edit/Edit';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={Edit} />
    </Switch>
  );
}

export default Routes;

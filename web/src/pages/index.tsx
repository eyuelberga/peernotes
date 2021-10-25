import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import history from '../utils/history';
import Loader from '../components/lib/Loader';

const App: React.FC<Record<string, never>> = () => {
  return (
    <Router history={history}>
      <Switch>
        <Suspense fallback={<Loader />}>
          {routes.map(({ path, exact, component }) => (
            <Route key={path} path={path} exact={exact} component={component} />
          ))}
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;

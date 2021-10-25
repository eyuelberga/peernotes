import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import DashboardLayout from '../../../layouts/Dashboard';
import Loader from '../../../components/lib/Loader';
import history from '../../../utils/history';
import routes from './routes';

const App: React.FC<Record<string, never>> = () => {
  return (
    <DashboardLayout>
      <Router history={history}>
        <Switch>
          <Suspense fallback={<Loader />}>
            {routes.map(({ path, exact, component }) => (
              <>
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={component}
                />
              </>
            ))}
          </Suspense>
        </Switch>
      </Router>
    </DashboardLayout>
  );
};

export default App;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tarea from './tarea';
import TareaDetail from './tarea-detail';
import TareaUpdate from './tarea-update';
import TareaDeleteDialog from './tarea-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TareaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TareaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TareaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tarea} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TareaDeleteDialog} />
  </>
);

export default Routes;

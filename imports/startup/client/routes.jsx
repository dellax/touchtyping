import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import LectionsContainer from '../../ui/containers/LectionsContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lekcie" component={LectionsContainer}/>
      <Route path="hry" component={NotFoundPage}/>
      <Route path="rebricky" component={NotFoundPage}/>
      <Route path="prihlasenie" component={AuthPageSignIn}/>
      <Route path="registracia" component={AuthPageJoin}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);

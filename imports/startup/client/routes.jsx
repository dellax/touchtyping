import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory } from 'react-router';
import { Roles } from 'meteor/alanning:roles';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import LectionsContainer from '../../ui/containers/LectionsContainer.jsx';
import LectionContainer from '../../ui/containers/LectionContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import NotEnoughRightsPage from '../../ui/pages/NotEnoughRightsPage.jsx';

// admin components
import AdminContainer from '../../ui/containers/AdminContainer.jsx';
import AdminLectionContainer from '../../ui/containers/AdminLectionContainer.jsx';
import AdminLectionsContainer from '../../ui/containers/AdminLectionsContainer.jsx';
import AdminLectionPage from '../../ui/pages/AdminLectionPage.jsx';

// game components
import GamesContainer from '../../ui/containers/GamesContainer.jsx';
import GameRacingContainer from '../../ui/containers/GameRacingContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lekcie" component={LectionsContainer}>
        <Route path="cvicenie/id/:id" component={LectionContainer}/>
      </Route>
      <Route path="hry" component={GamesContainer}/>
      <Route path="hra">
        <Route path="zavody/id/:id" component={GameRacingContainer}/>
      </Route>
      <Route path="rebricky" component={NotFoundPage}/>
      <Route path="prihlasenie" component={AuthPageSignIn}/>
      <Route path="registracia" component={AuthPageJoin}/>
      <Route path="administracia" component={AdminContainer}>
        <Route path="lekcie" component={AdminLectionsContainer}/>
        <Route path="lekcie/upravit/:id" component={AdminLectionContainer}/>
      </Route>
      <Route path="nedostatocne-prava" component={NotEnoughRightsPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);

// check if user is admin
function requireAdminAccess(nextState, replace) {
  let userId = Meteor.userId();
  if (!Roles.userIsInRole(userId, ['admin'])) {
    replace({
      pathname: '/nedostatocne-prava'
    })
  }
}
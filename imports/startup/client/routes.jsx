import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory } from 'react-router';
import { Roles } from 'meteor/alanning:roles';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import LectionsContainer from '../../ui/containers/LectionsContainer.jsx';
import ListContainer from '../../ui/containers/ListContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import NotEnoughRightsPage from '../../ui/pages/NotEnoughRightsPage.jsx';
import NewLectionPage from '../../ui/pages/NewLectionPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lekcie" component={LectionsContainer}/>
      <Route path="hry" component={NotFoundPage}/>
      <Route path="rebricky" component={NotFoundPage}/>
      <Route path="prihlasenie" component={AuthPageSignIn}/>
      <Route path="registracia" component={AuthPageJoin}/>
      <Route path="administracia" component={NewLectionPage} onEnter={requireAdminAccess}>
        <Route path="pridat-lekciu" component={NewLectionPage}/>
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
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Roles } from 'meteor/alanning:roles';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import LectionsIndexPage from '../../ui/pages/LectionsIndexPage.jsx';
import LectionsContainer from '../../ui/containers/LectionsContainer.jsx';
import LectionContainer from '../../ui/containers/LectionContainer.jsx';
import StatisticsContainer from '../../ui/containers/StatisticsContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import NotEnoughRightsPage from '../../ui/pages/NotEnoughRightsPage.jsx';
import HomePage from '../../ui/pages/HomePage.jsx';
import RankingsContainer from '../../ui/containers/RankingsContainer.jsx';
import StatisticsPageContainer from '../../ui/containers/StatisticsPageContainer.jsx';

// admin components
import AdminContainer from '../../ui/containers/AdminContainer.jsx';
import AdminLectionContainer from '../../ui/containers/AdminLectionContainer.jsx';
import AdminLectionsContainer from '../../ui/containers/AdminLectionsContainer.jsx';
import AdminLectionPage from '../../ui/pages/AdminLectionPage.jsx';
import AdminModelsContainer from '../../ui/containers/AdminModelsContainer.jsx';
import AdminModelsPage from '../../ui/pages/AdminModelsPage.jsx';
import AdminTextsContainer from '../../ui/containers/AdminTextsContainer.jsx';

// settings components
import SettingsContainer from '../../ui/containers/SettingsContainer.jsx';
import ModelsContainer from '../../ui/containers/ModelsContainer.jsx';

// game components
import GamesContainer from '../../ui/containers/GamesContainer.jsx';
import GameRacingContainer from '../../ui/containers/GameRacingContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path="lekcie" component={LectionsContainer}>
        <IndexRoute component={LectionsIndexPage} />
        <Route path="cvicenie/id/:id" component={LectionContainer}/>
        <Route path="statistiky/id/:id" component={StatisticsContainer}/>
      </Route>
      <Route path="hry" component={GamesContainer}/>
      <Route path="hra">
        <Route path="zavody/id/:id" component={GameRacingContainer}/>
      </Route>
      <Route path="rebricky" component={RankingsContainer}/>
      <Route path="prihlasenie" component={AuthPageSignIn}/>
      <Route path="registracia" component={AuthPageJoin}/>
      <Route path="administracia" component={AdminContainer} onEnter={requireAdminAccess}>
        <Route path="lekcie" component={AdminLectionsContainer}/>
        <Route path="lekcie/upravit/:id" component={AdminLectionContainer}/>
        <Route path="texty-k-hram" component={AdminTextsContainer}/>
        <Route path="modely-aut" component={AdminModelsContainer}/>
      </Route>
      <Route path="nastavenia/:id" component={SettingsContainer} onEnter={canEditSettings}>
        <Route path="modely-aut" component={ModelsContainer}/>
        <Route path="profil"/>
        <Route path="statistiky" component={StatisticsPageContainer}/>
      </Route>
      <Route path="nedostatocne-prava" component={NotEnoughRightsPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);

// check if user is admin
function canEditSettings(nextState, replace) {
  const userId = Meteor.userId();
  const typedId = nextState.params.id;
  if (userId != typedId) {
    replace({
      pathname: '/nedostatocne-prava'
    })
  }
}

function requireAdminAccess(nextState, replace) {
  const userId = Meteor.userId();
  if (!Roles.userIsInRole(userId, ['admin'])) {
    replace({
      pathname: '/nedostatocne-prava'
    })
  }
}
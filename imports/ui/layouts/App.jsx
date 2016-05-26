import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Link } from 'react-router';
import UserMenu from '../components/UserMenu.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  deepPurple500, deepPurple700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';;
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


const CONNECTION_ISSUE_TIMEOUT = 5000;

const lightBaseTheme =  getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: deepPurple500,
    primary2Color: deepPurple700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: deepPurple500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children }) {
   
  }

  logout() {
    Meteor.logout();

  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      children,
      location,
      notifications,
    } = this.props;
    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    // TODO prerobit content
    return (
      <MuiThemeProvider muiTheme={lightBaseTheme}>
        <div id="page-wrap">

          <div className="header">
            <img src="/img/logo.png" />
          </div>

          {showConnectionIssue && !connected
            ? <ConnectionNotification/>
            : null}

          <div className="menu-bar" >
            <ul className="header-menu horizontal-list">
              <li>
                <Link to="/">
                  <span className="icon fa fa-home scnd-font-color"></span>Úvod
                </Link>
              </li>
              <li>
                <Link to="/lekcie">
                  <span className="icon fa fa-book scnd-font-color"></span>Lekcie
                </Link>
              </li>
              <li>
                <Link to="/hry">
                  <span className="icon fa fa-gamepad scnd-font-color"></span>Hry
                </Link>
              </li>
              <li>
                <Link to="/rebricky">
                  <span className="icon fa fa-bar-chart-o scnd-font-color"></span>Rebríčky
                </Link>
              </li>
            </ul>

            <UserMenu user={user} logout={this.logout} notifications={notifications} />
          </div>

          <div id="wrapper-content">
            {loading
              ? <Loading key="loading"/>
              : clonedChildren}
          </div>

        </div> 
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};

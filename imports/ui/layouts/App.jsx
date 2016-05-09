import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Lists } from '../../api/lists/lists.js';
import { Link } from 'react-router';
import UserMenu from '../components/UserMenu.jsx';
import ListList from '../components/ListList.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

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

    // if we are on a private list, we'll need to go to a public one
    if (this.props.params.id) {
      const list = Lists.findOne(this.props.params.id);
      if (list.userId) {
        const publicList = Lists.findOne({ userId: { $exists: false } });
        this.context.router.push(`/lists/${ publicList._id }`);
      }
    }
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location,
    } = this.props;

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    // TODO prerobit content
    return (
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

          <UserMenu user={user} logout={this.logout}/>
        </div>

        <div id="wrapper-content">
          {loading
            ? <Loading key="loading"/>
            : clonedChildren}
        </div>

      </div> 
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  lists: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};

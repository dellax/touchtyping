import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Link } from 'react-router';
import Notifications from './Notifications.jsx';

export default class UserMenu extends React.Component {
  // TODO dokoncit
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  }

  renderLoggedIn() {
    const { open } = this.state;
    const { user, logout, newNotificationsCount, notifications } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));

    let notReadNotifications = null;
    if (newNotificationsCount > 0) notReadNotifications = newNotificationsCount;

    let pointsIcon;
    if (user.pointsLastGame > 0) {
      pointsIcon = <span className="fa fa-caret-up" style={{color: '#59F525'}}></span>;
    } else if (user.pointsLastGame < 0) {
      pointsIcon = <span className="fa fa-caret-down" style={{color: '#F55925'}}></span>;
    } else {
      pointsIcon = <span className="fa fa-minus" style={{color: '#25C1F5'}}></span>;
    }

    return (
      <div className="profile-menu">
        <ul>
          <li>
            <a href="#26">{user.pointsLections} <span className="fa fa-bolt scnd-font-color"></span></a>
          </li>
          <li>
            <a href="#26">{user.pointsGames} {pointsIcon}<span className="fa fa-caret-down scnd-font-color"></span></a>
          </li>
          <li>
            <a href="#">
              <span className="icon fa fa-envelope-o scnd-font-color"></span>
              <span className="notifications-number">{notReadNotifications}</span>
            </a>
            <Notifications notifications={notifications} />
          </li>
          <li>
            <a href="#26">{user.username} <span className="fa fa-angle-down scnd-font-color"></span></a>
            <ul>
              <li><a href="#">Môj profil</a></li>
              <li><Link to={`/nastavenia/${user._id}`}>Nastavenia</Link></li>
              <li><a onClick={logout}>Odhlásiť sa</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  renderLoggedInAdmin() {
    const { open } = this.state;
    const { user, logout, newNotificationsCount, notifications } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));

    let notReadNotifications = null;
    if (newNotificationsCount > 0) notReadNotifications = newNotificationsCount;

    let pointsIcon;
    if (user.pointsLastGame > 0) {
      pointsIcon = <span className="fa fa-caret-up" style={{color: '#59F525'}}></span>;
    } else if (user.pointsLastGame < 0) {
      pointsIcon = <span className="fa fa-caret-down" style={{color: '#F55925'}}></span>;
    } else {
      pointsIcon = <span className="fa fa-minus" style={{color: '#25C1F5'}}></span>;
    }

    return (
      <div className="profile-menu">
        <ul>
          <li>
            <a href="#">{user.pointsLections} <span className="fa fa-bolt scnd-font-color"></span></a>
          </li>
          <li>
            <a href="#">{user.pointsGames} {pointsIcon}</a>
          </li>
          <li>
            <a href="#">
              <span className="icon fa fa-envelope-o scnd-font-color"></span>
              <span className="notifications-number">{notReadNotifications}</span>
            </a>
            <Notifications notifications={notifications} />
          </li>
          <li>
            <a href="#26">{user.username} <span className="fa fa-angle-down scnd-font-color"></span></a>
            <ul>
              <li><a href="#">Môj profil</a></li>
              <li><Link to={`/nastavenia/${user._id}`}>Nastavenia</Link></li>
              <li><Link to="/administracia">Administrácia</Link></li>
              <li><a onClick={logout}>Odhlásiť sa</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div className="profile-menu">
        <div className="login-bar">
          <Link to="/registracia" className="button sign-in">Registrovať sa</Link>
          <Link to="/prihlasenie" className="button sign-in">Prihlásiť sa</Link>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.user) {
      let userId = this.props.user._id;
      if (Roles.userIsInRole(userId, ['admin'])) {
        return this.renderLoggedInAdmin();
      }
      return this.renderLoggedIn();
    }
    return this.renderLoggedOut();
  }
}

UserMenu.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
};
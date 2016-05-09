import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Link } from 'react-router';

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
    const { user, logout } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));

    return (
      <div className="profile-menu">
        <ul>
          <li>
            <a href="#1">
              <span className="icon fa fa-envelope-o scnd-font-color"></span>
              <span className="notifications-number">7</span>
            </a>
          </li>
          <li>
            <a href="#26">{user.username} <span className="fa fa-angle-down scnd-font-color"></span></a>
            <ul>
              <li><a href="#">Nastavenia</a></li>
              <li><a href="#">Môj profil</a></li>
              <li><a onClick={logout}>Odhlásiť sa</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  renderLoggedInAdmin() {
    const { open } = this.state;
    const { user, logout } = this.props;
    const email = user.emails[0].address;
    const emailLocalPart = email.substring(0, email.indexOf('@'));

    return (
      <div className="profile-menu">
        <ul>
          <li>
            <a href="#1">
              <span className="icon fa fa-envelope-o scnd-font-color"></span>
              <span className="notifications-number">7</span>
            </a>
          </li>
          <li>
            <a href="#26">{user.username} <span className="fa fa-angle-down scnd-font-color"></span></a>
            <ul>
              <li><a href="#">Nastavenia</a></li>
              <li><a href="#">Môj profil</a></li>
              <li><a href="#">Administrácia</a></li>
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

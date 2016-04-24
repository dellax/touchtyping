import { Meteor } from 'meteor/meteor';
import React from 'react';
import AuthPage from './AuthPage.jsx';
import { Link } from 'react-router';

export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) {
      errors.email = 'Nezadali ste email';
    }
    if (!password) {
      errors.password = 'Nezadali ste heslo';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        this.context.router.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div className="wrapper-auth">
        <h2>Prihlásenie sa</h2>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <label for="email">Používateľské meno</label>
          <input type="email" name="email" ref="email" placeholder="test@mailbox.com"/>
          <label for="password">Heslo</label>
          <input type="password" name="password" ref="password" placeholder="tu zadaj heslo"/>
          <br/>
          <button className="btn-primary" type="submit">Prihlásiť sa</button>
        </form>
      </div>
    );

    const link = <Link to="/registracia" className="link-auth">Ešte nemáte účet? Vytvorte si ho teraz.</Link>;

    return <AuthPage content={content} link={link}/>;
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};

import React from 'react';
import AuthPage from './AuthPage.jsx';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class JoinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirm = this.refs.confirm.value;
    const errors = {};

    if (!username) {
      errors.username = 'Používateľské meno je povinný údaj';
    }
    if (!email) {
      errors.email = 'Email je povinný údaj';
    }
    if (!password) {
      errors.password = 'Heslo je povinné';
    }
    if (confirm !== password) {
      errors.confirm = 'Heslá sa nezhodujú';
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      username,
      email,
      password,
    }, err => {
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
        <h2>Registrácia nového člena</h2>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <label for="username">Používateľské meno</label>
          <input type="text" name="username" ref="username" placeholder="jozko"/>
          <label for="email">Emailová adresa</label>
          <input type="email" name="email" ref="email" placeholder="test@mailbox.com"/>
          <label for="password">Heslo</label>
          <input type="password" name="password" ref="password" placeholder="tu zadaj heslo"/>
          <label for="confirm">Heslo znovu</label>
          <input type="password" name="confirm" ref="confirm" placeholder="tu zadaj heslo znovu"/>
          <br/>
          <button className="btn-primary" type="submit">Registrovať sa</button>
        </form>
      </div>
    );

    const link = <Link to="/prihlasenie" className="link-auth">Máte už účet? Prihláste sa tu</Link>;

    return <AuthPage content={content} link={link}/>;
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};

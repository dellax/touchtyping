import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    
  }

  

  render() {
    const {
      children,
      location,
    } = this.props;

    console.log(this.props);
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <div className="admin">
        {clonedChildren}
        <Link to="/administracia/pridat-lekciu"> tttt</Link>
      </div>
    );
  }
}
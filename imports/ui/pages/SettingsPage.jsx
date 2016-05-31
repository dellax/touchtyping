import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentWillReceiveProps({ loading, children }) {
   
  }

  render() {
    const {
      children,
      location,
      user
    } = this.props;

    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });
    console.log(this.props);
    return (
      <div className="admin">
        <div className="content-default">
          { clonedChildren }
        </div>
        <div className="right-container">
          <div className="menu-box block">
            <h2 className="titular">POUŽÍVATEĽSKÉ MENU</h2>
            <ul className="menu-box-menu">
              <li>
                <Link to={`/nastavenia/${user._id}/profil`} className="menu-box-tab">
                  <span className="icon fa fa-user scnd-font-color"></span>
                  Môj profil
                </Link>                         
              </li>
              <li>
                <Link to={`/nastavenia/${user._id}/modely-aut`} className="menu-box-tab">
                  <span className="icon fa fa-car scnd-font-color"></span>
                  Modely áut
                </Link>                         
              </li>
              <li>
                <Link to={`/nastavenia/${user._id}/statistiky`} className="menu-box-tab">
                  <span className="icon fa fa-bar-chart scnd-font-color"></span>
                  Štatistiky
                </Link>                          
              </li>
              <li>
                <Link to={`/nastavenia/${user._id}/notifikacie`} className="menu-box-tab">
                  <span className="icon fa fa-envelope-o scnd-font-color"></span>
                  Notifikácie
                </Link>                     
              </li>              
            </ul>
          </div>    
        </div>
      </div>
    );
  }
}
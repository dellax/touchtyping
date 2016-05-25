import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentWillReceiveProps({ loading, children }) {
   
  }

  render() {
    const {
      children,
      location,
    } = this.props;

    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <div className="admin">
        <div className="content-default">
          { clonedChildren }
        </div>
        <div className="right-container">
          <div className="menu-box block">
            <h2 className="titular">ADMIN MENU</h2>
            <ul className="menu-box-menu">
              <li>
                <Link to="/administracia/lekcie" className="menu-box-tab">
                <span className="icon fa fa-book scnd-font-color"></span>
                  Lekcie
                </Link>                         
              </li>
              <li>
                <Link to="/administracia/modely-aut" className="menu-box-tab">
                <span className="icon fa fa-car scnd-font-color"></span>
                  Modely áut
                </Link>                         
              </li>
              <li>
                <a className="menu-box-tab" href="#8"><span className="icon fa fa-user scnd-font-color"></span>Používatelia</a>                            
              </li>          
            </ul>
          </div>    
        </div>
      </div>
    );
  }
}
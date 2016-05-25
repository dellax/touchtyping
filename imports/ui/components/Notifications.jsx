import React from 'react';
import { Link } from 'react-router';

export default class Notifications extends React.Component {
  // TODO dokoncit
  constructor(props) {
    super(props);
  }

  render() {
  	return (
	  	<ul className="notifications-list">
	      <li className="notifications-header">Notifikácie</li>

	      <li className="notifications-item">
	        <div className="notifications-name">Nový model</div>
	        <div className="notifications-text">Gratulujem získal si nový model</div>
	        <div className="notifications-time">Pred 10 minutami</div>
	        <div className="notification-circle">Nová</div>
	      </li>
	      <li className="notifications-item">
	        <div className="notifications-name">Nový model</div>
	        <div className="notifications-text">Gratulujem získal si nový model</div>
	        <div className="notifications-time">Pred 10 minutami</div>
	      </li>
	      <li className="notifications-item">
	        <div className="notifications-name">Nový model</div>
	        <div className="notifications-text">Gratulujem získal si nový model</div>
	        <div className="notifications-time">Pred 10 minutami</div>
	      </li>

	      <li className="notifications-footer">Všetky videné</li>
	    </ul>
	  )
  }
}
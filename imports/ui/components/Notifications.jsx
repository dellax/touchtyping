import React from 'react';
import { Link } from 'react-router';
import 'moment/locale/sk';
import moment from 'moment';


moment.locale('sk');

export default class Notifications extends React.Component {
  // TODO add moment js
  
  constructor(props) {
    super(props);
  }

  render() {
  	const notifications = this.props.notifications;
  	console.log(notifications);
  	return (
	  	<ul className="notifications-list">
	      <li className="notifications-header">Notifikácie</li>
	      {notifications.map((notification) => {
	      	const time = moment(notification.createdAt).fromNow();
	      	return (
	      		<li className="notifications-item">
		      		<div className="notifications-name">{notification.name}</div>
			        <div className="notifications-text">{notification.text}</div>
			        <div className="notifications-time">{time}</div>
			        <div className="notification-circle">{!notification.read ? 'Nová' : null}</div>
		        </li>
	      	)
	      })}

	      <li className="notifications-footer">Všetky videné</li>
	    </ul>
	  )
  }
}
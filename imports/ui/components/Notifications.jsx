import React from 'react';
import { Link } from 'react-router';
import 'moment/locale/sk';
import moment from 'moment';
import { checkRead, checkAllRead } from '../../api/notifications/methods.js';


moment.locale('sk');

export default class Notifications extends React.Component {  
  constructor(props) {
    super(props);
  }

  checkReadNotification(notificationId) {
  	checkRead.call({notificationId}, (err) => {
      if (err) {
        /* eslint-disable no-alert */
        alert('Could not mark as read.');
      }
    });
  }

  checkReadForAllNotifications() {
  	checkAllRead.call({}, (err) => {
  		if (err) {
  			/* eslint-disable no-alert */
        alert('Could not mark as read.');
  		}
  	});
  }

  render() {
  	const notifications = this.props.notifications;
  	
  	return (
	  	<ul className="notifications-list">
	      <li className="notifications-header">Notifikácie</li>
	      {notifications.map((notification) => {
	      	const time = moment(notification.createdAt).fromNow();
	      	return (
	      		<li className="notifications-item" onClick={this.checkReadNotification.bind(this, notification._id)}>
		      		<div className="notifications-name">{notification.name}</div>
			        <div className="notifications-text">{notification.text}</div>
			        <div className="notifications-time">{time}</div>
			      	{!notification.read ?  <div className="notification-circle">Nová</div> : null}
		        </li>
	      	)
	      })}

	      <li className="notifications-footer" onClick={this.checkReadForAllNotifications.bind(this)}>Všetky videné</li>
	    </ul>
	  )
  }
}
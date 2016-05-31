import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Statistics from '../components/TouchType/Statistics.jsx';
import Modal from 'boron/DropModal';
import 'moment/locale/sk';
import moment from 'moment';

moment.locale('sk');


export default class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notifications = this.props.notifications;

    return (
      <div>
        <div className="notifications-page">
          <h2>Notifikácie</h2>

          <table id="hor-minimalist-a">
            <thead>
              <tr>
                <th scope="col">Dátum</th>
                <th scope="col">Názov</th>
                <th scope="col">Správa</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((o) => {
                return (
                  <tr>
                    <td>{moment(o.createdAt).format('llll')}</td>
                    <td>{o.name}</td>
                    <td>{o.text}</td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

NotificationsPage.contextTypes = {
  router: React.PropTypes.object,
};

NotificationsPage.propTypes = {
  models: React.PropTypes.array,
};

NotificationsPage.defaultProps = {
  models: []
};
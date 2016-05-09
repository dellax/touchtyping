import React from 'react';
import Message from '../components/Message.jsx';

const NotEnoughRightsPage = () => (
  <div className="page not-found">
    <div className="content-scrollable">
      <Message title="Nedostatocne prava"/>
    </div>
  </div>
);

export default NotEnoughRightsPage;
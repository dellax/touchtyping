import React from 'react';
import MobileMenu from '../components/MobileMenu.jsx';
import Message from '../components/Message.jsx';

const NotFoundPage = () => (
  <div className="page not-found">
    <div className="content-scrollable">
      <Message title="Stránka nenájdená"/>
    </div>
  </div>
);

export default NotFoundPage;

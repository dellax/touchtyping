import React from 'react';

const ConnectionNotification = () => (
  <div className="notifications">
    <div className="notification">
      <span className="icon-sync"></span>
      <div className="meta">
        <div className="title-notification">Pokúšam sa pripojiť</div>
        <div className="description">Problém s pripojením k serveru</div>
      </div>
    </div>
  </div>
);

export default ConnectionNotification;

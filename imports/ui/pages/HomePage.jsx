import React from 'react';

// a common layout wrapper for auth pages
const HomePage = ({ content, link }) => (
  <div>
    <div className="content-default home-page">
  		<h2>Vitajte na stránke strojopis online</h2>
      <p>Táto stránka je zameraná na učenie strojopisu pre deti základných škôl.<br/>
        Možnosti tejto stránky sú v skratke zhrnuté nižšie.
      </p>
      <ul>
        <li>Autentifikácia používateľa</li>
        <li>Režim učenia strojopisu</li>
        <li>Zobrazovanie a ukladanie štatistík</li>
        <li>Online hry pre viacerých hráčov</li>
        <li>Rebríčky</li>
        <li>Bodovací systém</li>
        <li>Možnosť vybrať si jeden z modelov automobilov</li>
      </ul>
  	</div>
  	<div className="right-container">
  		<ul className="social horizontal-list block">
        <li className="facebook"><p className="icon"><span className="fa fa-facebook"></span></p><p className="number">1211</p></li>
        <li className="twitter"><p className="icon"><span className="fa fa-twitter"></span></p><p className="number">450</p></li>
        <li className="googleplus"><p className="icon"><span className="fa fa-google-plus"></span></p><p className="number">333</p></li>
        <li className="mailbox"><p className="icon"><span className="fa fa-envelope"></span></p><p className="number">1238</p></li>
      </ul>
      <div className="blank block">
        
      </div>
  	</div>
  </div>
);

HomePage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default HomePage;
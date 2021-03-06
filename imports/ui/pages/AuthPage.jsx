import React from 'react';

// a common layout wrapper for auth pages
const AuthPage = ({ content, link }) => (
  <div>
    <div className="content-default">
  		{content}
  		{link}
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

AuthPage.propTypes = {
  content: React.PropTypes.element,
  link: React.PropTypes.element,
};

export default AuthPage;

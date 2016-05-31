import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class RankingsPages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rankings = this.props.rankings;
    const currentUser = this.props.user;
    let rank = 0;
    
    return (
      <div>
        <div className="content-default home-page">
          <h2>Rebríčky najlepších</h2>
          <Table>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Umiestnenie</TableHeaderColumn>
                <TableHeaderColumn>Meno</TableHeaderColumn>
                <TableHeaderColumn>Body</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {rankings.map((user) => {
                rank++;
                let selected = false;
                if (currentUser && user._id === currentUser._id) selected = true;

                let pointsIcon;
                if (user.pointsLastGame > 0) {
                  pointsIcon = <span className="fa fa-caret-up" style={{color: '#59F525'}}></span>;
                } else if (user.pointsLastGame < 0) {
                  pointsIcon = <span className="fa fa-caret-down" style={{color: '#F55925'}}></span>;
                } else {
                  pointsIcon = <span className="fa fa-minus" style={{color: '#25C1F5'}}></span>;
                }

                return (
                  <TableRow key={user._id} selected={selected}>
                    <TableRowColumn>{rank}</TableRowColumn>
                    <TableRowColumn>{user.username}</TableRowColumn>
                    <TableRowColumn>{user.pointsGames} {pointsIcon}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
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
  }
}

RankingsPages.contextTypes = {
  router: React.PropTypes.object,
};

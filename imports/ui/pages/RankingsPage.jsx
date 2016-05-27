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
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
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

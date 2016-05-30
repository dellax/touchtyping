import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Session } from 'meteor/session';


export default class LectionsIndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const exercise = this.props.exercise;
    const { router } = this.context;
    return (
      <div className="lections-index">
        <h2>Lekcie</h2>
        <p>Vyber si jednu z lekcií napravo a začni získavať body za ich splnenie.</p>
      </div>
    );
  }
}

LectionsIndexPage.contextTypes = {
  router: React.PropTypes.object,
};

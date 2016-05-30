import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Statistics from '../components/TouchType/Statistics.jsx';
import Modal from 'boron/DropModal';


export default class StatisticsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { statsWithExercise: {} };
  }

  handleOnClick(statsWithExercise) {
    this.setState({statsWithExercise});
    this.showModal();
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }
  
  

  render() {
    const statisticWithExercises = this.props.statisticWithExercises;

    const statsWithExercise = this.state.statsWithExercise;

    let modalStyle = {
      width: '900px',
      height: '560px',
      minWidth: '900px'
    };


    return (
      <div>
        <div className="statistics-page">
          <h2>Štatistiky</h2>
          {statisticWithExercises.map((o) => {
            return (
              <div className="statistics-item" onClick={this.handleOnClick.bind(this,o)}>{o.exercise.name}</div>
            )
          })}

        </div>
        <Modal ref="modal" modalStyle={modalStyle}>
          <Statistics stats={statsWithExercise.statistics} exercise={statsWithExercise.exercise} olderStats={{}}/>
        </Modal>
      </div>
    );
  }
}

StatisticsPage.contextTypes = {
  router: React.PropTypes.object,
};

StatisticsPage.propTypes = {
  models: React.PropTypes.array,
};

StatisticsPage.defaultProps = {
  models: []
};
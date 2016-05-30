import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Statistics from '../components/TouchType/Statistics.jsx';
import Modal from 'boron/DropModal';
import 'moment/locale/sk';
import moment from 'moment';

moment.locale('sk');


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
          <p>Po kliknuťí na niektorú zo štatistík sa zobrazí detailnejší nahľad.</p>
          
          <table id="hor-minimalist-a">
            <thead>
              <tr>
                <th scope="col">Dátum</th>
                <th scope="col">Názov cvičenia</th>
                <th scope="col">Body</th>
                <th scope="col">WPM</th>
              </tr>
            </thead>
            <tbody>
              {statisticWithExercises.map((o) => {
                return (
                  <tr onClick={this.handleOnClick.bind(this, o)}>
                    <td>{moment(o.statistics.createdAt).format('llll')}</td>
                    <td>{o.exercise.name}</td>
                    <td>{o.exercise.points}</td>
                    <td>{o.statistics.averageWpm}</td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>

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
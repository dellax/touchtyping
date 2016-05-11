import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Tabbordion, Panel } from 'react-tabbordion';
import TouchTypeLearning from '../components/TouchType/TouchTypeLearning.jsx';

// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classNames = {
      animator: 'accordion-animator',
      content: 'accordion-content',
      panel: 'accordion-panel',
      title: 'accordion-title'
    }

    let testText = `What suffering will have to be endured before the workers realize that? It was from a man in Arizona. What suffering will have to be endured.`.replace(/(\n)+/g, '');

    let testStats = {
      secondsElapsed: 50,
      lettersTyped: 150,
      wordsTyped: 30,
      incorrectWords: ['test', 'amater', 'touch', 'typer'],
      incorrectLetters: ['a', 'b', 'c'],
      currentWpm: 80,
      highestWpm: 120,
      wpmList: [0, 100, 110, 105, 80, 90, 100, 110, 105, 80, 90, 100, 110, 105, 80, 90]
    }

    const data = this.props.lectionsWithExercises;

    function renderItem(data, index) {
      return (
        <ExerciseItem key={index} className="dynamic-item" sortData={data}>
          {data.name}
          <span className="delete"
            onMouseDown={this.handleRemoveElement.bind(this, index)}
          >&times;</span>
          <span className="delete"
            onMouseDown={this.handleUpdateElement.bind(this, index)}
          > upravit</span>
        </ExerciseItem>
      );
    }

    return (
      <div className="lections-container">
        <div className="lections-menu">
          <Tabbordion mode="toggle" className="accordion" classNames={classNames} initialIndex={0} name="tabs">
            { data.map((lection) => {
              return (
                <Panel title={<span className="lection-name">{lection.name}</span>}>
                  <ul>
                    {lection.exercises.map((exercise) => {
                      return <li><a href="#">{exercise.name}</a></li>;
                    })}
                  </ul>
                </Panel>
              );
            })}
          </Tabbordion>
        </div>
        
        <div className="lection-content">
          {/*<TouchTypeLearning text={testText} /> */}
          <Statistics stats={testStats} />
        </div>
      </div>
    );
  }
}

ListPage.propTypes = {
  list: React.PropTypes.object,
  todos: React.PropTypes.array,
  loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
};

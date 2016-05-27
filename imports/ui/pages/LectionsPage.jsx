import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Tabbordion, Panel } from 'react-tabbordion';
import TouchTypeLearning from '../components/TouchType/TouchTypeLearning.jsx';
import { Session } from 'meteor/session';

// TODO zmazat po vylepseni
import Statistics from '../components/TouchType/Statistics.jsx';


export default class LectionsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  setIndex(lection, e) {
    Session.set('index', lection.index);
  }

  render() {
    let classNames = {
      animator: 'accordion-animator',
      content: 'accordion-content',
      panel: 'accordion-panel',
      title: 'accordion-title'
    }

    const router = this.context.router;
    const children = this.props.children;
    const data = this.props.lectionsWithExercises;

    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    let initialIndex = Session.get('index');
    if (typeof initialIndex === 'undefined') {
      initialIndex = 0;
    }
    
    return (
      <div className="lections-container">
        <div className="lections-menu">
          <Tabbordion mode="toggle" className="accordion" classNames={classNames} initialIndex={initialIndex} name="tabs">
            { data.map((d) => {
              const lection = d.lection;
              const exercises = d.exercises;
              let setIndex = this.setIndex.bind(this, lection);
              return (
                <Panel title={<span className="lection-name" key={lection._id} >{lection.name}</span>}>
                  <ul>
                    {exercises.map((exercise) => {
                      return (
                        <li key={exercise._id}>
                          <Link to={`/lekcie/cvicenie/id/${exercise._id}`} onClick={setIndex}>{exercise.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              );
            })}
          </Tabbordion>
        </div>
        
        <div className="lection-content">
          {clonedChildren}
        </div>
      </div>
    );
  }
}

LectionsPage.propTypes = {
  list: React.PropTypes.object,
  todos: React.PropTypes.array,
  loading: React.PropTypes.bool,
  listExists: React.PropTypes.bool,
};

LectionsPage.contextTypes = {
  router: React.PropTypes.object,
};
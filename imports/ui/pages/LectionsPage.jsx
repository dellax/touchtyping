import React from 'react';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import { Tabbordion, Panel } from 'react-tabbordion';

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

    return (
      <div className="lections-container">
        <div className="lections-menu">
          <Tabbordion mode="toggle" className="accordion" classNames={classNames} initialIndex={0} name="tabs">
            <Panel title={<span className="lection-name">Lekcia 1</span>}>
              <ul>
                <li><a href="#">Pismena as df jk</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
              </ul>
            </Panel>
            <Panel title={<span className="lection-name">Lekcia 2</span>}>
              <ul>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
              </ul>
            </Panel>
          </Tabbordion>
        </div>
        
        <div className="lection-content">
          
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

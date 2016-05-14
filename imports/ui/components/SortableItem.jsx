import React from 'react';
import { SortableItemMixin } from 'react-anything-sortable';

// need to use mixins here
export default React.createClass({
  mixins: [SortableItemMixin],


  render() {
    const { className, children } = this.props;
    return this.renderWithSortable(
      <div className="exercise-item">
        {children}
      </div>
    );
  }
});
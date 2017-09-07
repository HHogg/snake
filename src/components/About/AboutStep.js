import React, { Component, PropTypes } from 'react';
import AboutStepControls from './AboutStepControls';
import './AboutStep.css';

export default class AboutStep extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    pathFrom: PropTypes.string,
    pathTo: PropTypes.string,
  };

  render() {
    const {
      children,
      pathFrom,
      pathTo,
    } = this.props;

    return (
      <div className="sh-about__step">
        { children }

        <AboutStepControls from={ pathFrom } to={ pathTo } />
      </div>
    );
  }
}

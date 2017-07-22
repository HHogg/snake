import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import AboutStepControls from './AboutStepControls';
import './AboutStep.css';

export default class AboutStep extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    maxSteps: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onSkip: PropTypes.func,
    onStepChange: PropTypes.func.isRequired,
  };

  render() {
    const { active, children } = this.props;
    const { maxSteps, step, onSkip, onStepChange } = this.context;
    const classes = classnames('sh-about-step', {
      'sh-about-step--active': active,
    });

    return (
      <div className={ classes }>
        { children }

        <AboutStepControls
            maxSteps={ maxSteps }
            step={ step }
            onSkip={ onSkip }
            onStepChange={ onStepChange } />
      </div>
    );
  }
}

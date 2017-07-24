import React, { Component, PropTypes } from 'react';
import AboutStepControl from './AboutStepControl';

export default class AboutStepControls extends Component {
  static propTypes = {
    maxSteps: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onSkip: PropTypes.func,
    onStepChange: PropTypes.func.isRequired,
  };

  render() {
    const { maxSteps, step, onSkip, onStepChange } = this.props;

    return (
      <div className="sh-about-step__controls">
        <AboutStepControl
            hidden={ step < 1 }
            onClick={ () => onStepChange(step - 1) }>
          Previous
        </AboutStepControl>

        <AboutStepControl
            hidden={ !onSkip || step >= maxSteps }
            inattention={ true }
            onClick={ () => onSkip() }>
          Skip (and don't show again)
        </AboutStepControl>

        <AboutStepControl
            attention={ true }
            hidden={ step >= maxSteps }
            onClick={ () => onStepChange(step + 1) }>
          Next
        </AboutStepControl>
      </div>
    );
  }
}

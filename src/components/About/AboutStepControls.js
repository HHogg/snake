import React, { Component, PropTypes } from 'react';
import Link from '../Link/Link';

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
        <div className="sh-about-step__control">
          { step > 0 && (
            <Link onClick={ () => onStepChange(step - 1) }>
              Previous
            </Link>
          ) }
        </div>

        <div className="sh-about-step__control">
          { onSkip && step < maxSteps && (
            <Link onClick={ () => onSkip() }>
              Skip (and don't show again)
            </Link>
          ) }
        </div>

        <div className="sh-about-step__control">
          { step < maxSteps && (
            <Link onClick={ () => onStepChange(step + 1) }>
              Next
            </Link>
          ) }
        </div>
      </div>
    );
  }
}

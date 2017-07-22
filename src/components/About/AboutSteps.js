import React, { Children, Component, PropTypes, cloneElement } from 'react';

export default class AboutSteps extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    step: PropTypes.number.isRequired,
    onSkip: PropTypes.func,
    onStepChange: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    maxSteps: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onSkip: PropTypes.func,
    onStepChange: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      maxSteps: this.props.children.length - 1,
      step: this.props.step,
      onSkip: this.props.onSkip,
      onStepChange: this.props.onStepChange,
    };
  }

  render() {
    const { children, step } = this.props;

    return (
      <div className="sh-about-step__steps">
        { Children.map(children, (_, i) => cloneElement(_, { active: step === i })) }
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Link from '../Link/Link';

export default class AboutStepControl extends Component {
  static propTypes = {
    attention: PropTypes.bool,
    children: PropTypes.node.isRequired,
    hidden: PropTypes.bool,
    inattention: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { attention, children, hidden, inattention, onClick } = this.props;
    const classes = classnames('sh-about-step__control', {
      'sh-about-step__control--attention': attention,
      'sh-about-step__control--hidden': hidden,
      'sh-about-step__control--inattention': inattention,
    });

    return (
      <div className={ classes }>
        <Link onClick={ onClick }>
          <div className="sh-about-step__control-text">
            { children }
          </div>
        </Link>
      </div>
    );
  }
}

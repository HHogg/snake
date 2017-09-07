import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

export default class AboutStepControls extends Component {
  static propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
  };

  render() {
    const { from: fromLink, to: toLink } = this.props;

    return (
      <div className="sh-about__step-controls">
        <div className="sh-about__step-from">
          { fromLink && (
            <NavLink className="sh-about__step-link" to={ fromLink }>
              Previous
            </NavLink>
          ) }

        </div>
        <div className="sh-about__step-to">
          { toLink && (
            <NavLink className="sh-about__step-link" to={ toLink }>
              <div className="sh-about__step-bounce">
                Next
              </div>
            </NavLink>
          ) }
        </div>
      </div>
    );
  }
}

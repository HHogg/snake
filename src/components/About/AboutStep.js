import React, { Component, PropTypes } from 'react';
import AboutStepControls from './AboutStepControls';
import Flex from '../Flex/Flex';
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
      <Flex
          alignChildrenHorizontal="middle"
          alignChildrenVertical="middle"
          className="sh-about__step"
          direction="vertical"
          padding="x2"
          parent>
        <Flex maxWidth="small" shrink>
          { children }
          <AboutStepControls from={ pathFrom } to={ pathTo } />
        </Flex>
      </Flex>
    );
  }
}

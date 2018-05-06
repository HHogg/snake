import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Base, Text } from 'preshape';

export default class AboutSection extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    last: PropTypes.bool,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { children, last, title } = this.props;

    return (
      <Base margin="x6">
        <Text margin="x2" size="heading" strong>{ title }</Text>
        { children }
        { !last && <Text align="middle" margin="x6" size="heading" strong>~</Text> }
      </Base>
    );
  }
}

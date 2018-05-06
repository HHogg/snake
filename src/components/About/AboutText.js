import React, { Component } from 'react';
import { Text } from 'preshape';

export default class AboutText extends Component {
  render() {
    return (
      <Text margin="x2" { ...this.props } />
    );
  }
}

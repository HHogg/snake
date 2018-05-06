import PropTypes from 'prop-types';
import React, { Component } from 'react';
import fecha from 'fecha';
import { Alert, Button, Buttons, Flex, Icon, Text } from 'preshape';

export default class SavedSolutions extends Component {
  static propTypes = {
    compact: PropTypes.bool,
    error: PropTypes.string,
    running: PropTypes.bool,
    modified: PropTypes.number.isRequired,
    onDelete: PropTypes.func,
    onLoad: PropTypes.func,
    onSubmit: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
    };
  }

  handleDelete() {
    const { onDelete } = this.props;
    this.setState({ isDeleting: true });
    onDelete();
  }

  render() {
    const { isDeleting } = this.state;
    const { compact, error, modified, onSubmit, onLoad, running, title } = this.props;

    return (
      <Alert
          Component={ Flex }
          alignChildrenVertical="middle"
          backgroundColor={ (error || running) ? null : 'shade-2' }
          color={ (running && 'accent') || (error && 'negative') }
          direction={ compact ? 'vertical' : 'horizontal' }
          flash={ !!(running || error) }
          gutter="x4"
          padding="x4"
          style={ (running || error) ? 'solid' : null }>

        { !compact && (
          <Flex>
            <Icon
                name={ (running && 'Progress') || (error && 'Error') || 'Code' }
                size="1rem"
                spin={ running ? 'slow' : null } />
          </Flex>
        ) }

        <Flex grow initial={ compact ? null : 'none' }>
          <Text strong>{ title }</Text>
          <Text size="small">
            { fecha.format(new Date(modified), 'dddd Do MMMM, YYYY') }
          </Text>

          { (error && !running) && (
            <Text margin="x2" size="small">
              <Text inline strong>Status:</Text> ERROR ({ error })
            </Text>
          ) }

          { (running) && (
            <Text margin="x2" size="small">
              <Text inline strong>Status:</Text> RUNNING
            </Text>
          ) }
        </Flex>

        <Flex>
          <Buttons>
            <Button
                color="positive"
                disabled={ running }
                onClick={ () => onSubmit() }>
              Submit
            </Button>
            <Button onClick={ () => onLoad() }>
              Edit
            </Button>
            <Button
                color="negative"
                disabled={ isDeleting }
                onClick={ () => this.handleDelete() }>
              Delete
            </Button>
          </Buttons>
        </Flex>
      </Alert>
    );
  }
}

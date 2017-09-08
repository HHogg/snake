import React, { Component, PropTypes } from 'react';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';

export default class SolutionControls extends Component {
  static propTypes = {
    isRunning: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
    const { isRunning, onSubmit, onLoad } = this.props;

    return (
      <ButtonGroup>
        <Button
            color="gray"
            disabled={ isRunning }
            onClick={ () => onSubmit() }>
          Submit
        </Button>
        <Button
            color="gray"
            onClick={ () => onLoad() }>
          Load
        </Button>
        <Button
            color="red"
            disabled={ isDeleting }
            onClick={ () => this.handleDelete() }>
          Delete
        </Button>
      </ButtonGroup>
    );
  }
}

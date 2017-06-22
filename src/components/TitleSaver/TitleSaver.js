import React, { Component, PropTypes } from 'react';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';
import './TitleSaver.css';

export default class TitleSaver extends Component {
  static propTypes = {
    edited: PropTypes.bool.isRequired,
    value: PropTypes.string,
    onNew: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onTitleChange: PropTypes.func.isRequired,
  };

  render() {
    const { edited, onNew, onSave, onTitleChange, value } = this.props;

    return (
      <div className="sh-title-saver">
        <div className="sh-title-saver__input-container">
          <input
              className="sh-title-saver__input"
              onChange={ (e) => onTitleChange({ title: e.target.value }) }
              placeholder="Untitled solution"
              value={ value || '' } />
        </div>

        <div className="sh-title-saver__button">
          <ButtonGroup>
            <Button
                color="blue"
                onClick={ () => onNew() }>New</Button>
            { onSave && (
              <Button
                  color="blue"
                  disabled={ !value || !edited }
                  onClick={ () => onSave() }>Save</Button>
            ) }
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

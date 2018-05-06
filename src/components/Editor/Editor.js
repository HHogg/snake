import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import omit from 'lodash.omit';
import { Bounds, Flex } from 'preshape';
import './Editor.css';

let brace;

if (typeof window !== 'undefined') {
  brace = require('brace');
  require('brace/mode/javascript');
  brace.define('ace/theme/sh', (require, exports) => {
    exports.isDark = true;
    exports.cssClass = 'ace-sh';
  });
}

/* eslint-disable react/no-find-dom-node */
export default class Editor extends Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => {
      const { initialValue, onChange } = this.props;

      this.ide = brace.edit(this.el);
      this.ide.setShowPrintMargin(false);
      this.ide.setShowFoldWidgets(false);
      this.ide.setHighlightActiveLine(false);
      this.ide.$blockScrolling = Infinity;
      this.ide.getSession().setMode('ace/mode/javascript');
      this.ide.setTheme('ace/theme/sh');
      this.ide.session.setUseWrapMode(true);
      this.ide.session.setOptions({
        tabSize: 2,
        useSoftTabs: true,
      });

      this.ide.setValue(initialValue, 1);
      this.ide.getSession().setUndoManager(new brace.UndoManager());
      this.ide.on('change', () => onChange({ content: this.ide.getValue() }));
    });
  }

  componentWillReceiveProps({ initialValue }) {
    if (this.ide && initialValue !== this.ide.getValue()) {
      this.ide.setValue(initialValue, 1);
    }
  }

  render() {
    return (
      <Bounds
          Component={ Flex }
          direction="vertical"
          grow
          onChange={ () => this.ide.resize() }>
        { () => (
          <Flex { ...omit(this.props, ['initialValue', 'onChange']) }
              direction="vertical"
              borderColor
              borderSize="x2"
              paddingVertical="x2">
            <Flex
                className="sh-editor"
                grow
                ref={ (el) => this.el = ReactDOM.findDOMNode(el) } />
          </Flex>
        ) }
      </Bounds>
    );
  }
}

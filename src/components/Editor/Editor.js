import React, { Component, PropTypes } from 'react';
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

export default class Editor extends Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
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
  }

  componentWillReceiveProps({ initialValue }) {
    if (initialValue !== this.ide.getValue()) {
      this.ide.setValue(initialValue, 1);
    }
  }

  render() {
    return (
      <div
          className="sh-editor"
          ref={ (el) => this.el = el } />
    );
  }
}

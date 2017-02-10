require('./Editor.css');

const brace = require('brace');
const { LOCAL_STORAGE_CONTENT_KEY } = require('../config');

require('brace/mode/javascript');
brace.define('ace/theme/asi', (require, exports) => {
  exports.isDark = true;
  exports.cssClass = 'ace-asi';
});

/* eslint-disable max-len */
const initialContent = `/**
 * @param {Number} x The x coordinate of the cell
 * @param {Number} y The y coordinate of the cell
 * @param {Number} xMax The number of cells across the x axis
 * @param {Number} yMax The number of cells across the y axiom
 * @param {Array[Array[Number]} snake Coordinates of the position of the snake from head to tail. E.g. [[4, 1], [3, 1]]
 * @param {Array[Number]} point Coorodinates of the point.
 */
function heuristic(x, y, xMax, yMax, snake, point) {

  /**
   * This is an example to get you started. It simply returns the standard
   * heuristic 'Mahanttan distance'. However it doesn't take into account
   * its current or future environment.
   */
  return Math.abs(x - point[0]) + Math.abs(y - point[1]);
}
`;
/* eslint-enable max-len */


class Editor {
  constructor(element) {
    this.ide = brace.edit(element);

    this.ide.setShowPrintMargin(false);
    this.ide.setShowFoldWidgets(false);
    this.ide.setHighlightActiveLine(false);
    this.ide.$blockScrolling = Infinity;
    this.ide.getSession().setMode('ace/mode/javascript');
    this.ide.setTheme('ace/theme/asi');
    this.ide.session.setUseWrapMode(true);
    this.ide.session.setOptions({
      tabSize: 2,
      useSoftTabs: true,
    });

    this.ide.setValue(this.getInitialValue(), 1);
    this.ide.on('change', () => this.saveContent());
  }

  getInitialValue() {
    return window.localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY) || initialContent;
  }

  getValue() {
    return this.ide.getValue();
  }

  saveContent() {
    window.localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, this.getValue());
  }
}

module.exports = Editor;

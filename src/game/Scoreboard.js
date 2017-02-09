const calculateAverage = require('../utils/calculateAverage');
const calculateScore = require('../utils/calculateScore');

class Scoreboard {
  constructor(averageElement, pointsElement, scoreElement, canvas) {
    this.averageElement = averageElement;
    this.pointsElement = pointsElement;
    this.scoreElement = scoreElement;
    this.canvas = canvas;
    this.reset();
  }

  calculateScore(history) {
    return calculateScore((this.canvas.xMax * this.canvas.yMax),
      this.average,
      history[history.length - 1],
      this.points);
  }

  increase(history) {
    this.average = Math.floor(calculateAverage(history));
    this.points = this.points + 1;
    this.score = this.score + this.calculateScore(history);
    this.write();
  }

  reset() {
    this.average = 0;
    this.points = 0;
    this.score = 0;
    this.write();
  }

  write() {
    this.averageElement.innerHTML = Math.floor(this.average);
    this.pointsElement.innerHTML = this.points;
    this.scoreElement.innerHTML = Math.floor(this.score);
  }
}

module.exports = Scoreboard;

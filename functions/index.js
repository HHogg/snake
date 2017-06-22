const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getStats } = require('./functions/addLeaderboardStats');

admin.initializeApp(functions.config().firebase);

exports.addLeaderboardStats = functions
  .database
  .ref('/leaderboard/{solutionId}/content')
  .onWrite((event) => {
    const solution = event.data.val();
    const stats = getStats(solution);

    if (stats.score === 0) {
      return event.data.ref.parent.remove();
    }

    return event.data.ref.parent.update(stats);
  });

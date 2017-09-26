const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getStats } = require('./functions/addLeaderboardStats');

admin.initializeApp(functions.config().firebase);

exports.addLeaderboardStats = functions
  .database
  .ref('/leaderboardSolutions/{userId}/{solutionId}')
  .onWrite((event) => {
    const solution = event.data.val();

    if (!solution) {
      return null;
    }

    const { userId, solutionId } = event.params;
    const leaderboardSolutionScoreRef = admin.database()
      .ref(`/leaderboard/${solutionId}/_pathCount`);
    const userSolutionRef = admin.database()
      .ref(`/solutions/${userId}/${solutionId}`);

    return userSolutionRef.update({ error: null, running: true })
      .then(() => getStats(solution))
      .then((historu) =>
        leaderboardSolutionScoreRef.update({
          length: historu.length,
          values: historu.map(([,, tails]) => tails.length),
        }))
      .then(() =>
        userSolutionRef.update({
          error: null,
          running: false,
        }))
      .catch((error) =>
        userSolutionRef.update({
          error: error.toString(),
          running: false,
        })
      );
  });

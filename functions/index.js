const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { MAX_USER_SOLUTIONS } = require('./config');
const { getStats } = require('./functions/addLeaderboardStats');

admin.initializeApp(functions.config().firebase);

exports.addLeaderboardStats = functions
  .database
  .ref('/leaderboardSolutions/{userId}/{solutionId}')
  .onWrite((event) => {
    const solution = event.data.val();
    const solutionRef = admin
      .database()
      .ref(`/leaderboard/${event.data.key}`);

    let stats;

    try {
      stats = getStats(solution);
    } catch (error) {
      return solutionRef.update({ error: error.toString() });
    }

    return solutionRef.update(stats);
  });

exports.limitSolutions = functions
  .database
  .ref('/solutions/{userId}/{solutionId}')
  .onWrite((event) =>
    event.data.ref.parent.once('value').then((snapshot) => {
      if (snapshot.numChildren() > MAX_USER_SOLUTIONS) {
        let count = 0;
        const updates = {};

        snapshot.forEach((child) => {
          if (count++ >= MAX_USER_SOLUTIONS) {
            updates[child.key] = null;
          }
        });

        return event.data.ref.parent.update(updates);
      }
    })
  );

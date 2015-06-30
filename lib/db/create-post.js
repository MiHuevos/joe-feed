const r = require('rethinkdb');
const Promise = require('bluebird');

const missing = (field) => {
  return Promise.reject({ status: 400, missing: field });
};

module.exports = ({ owner, markdown, remoteUser }) => {
  if (typeof markdown !== 'string') return missing('markdown');
  if (typeof owner !== 'string') return missing('owner');
  if (typeof remoteUser !== 'string') return missing('remoteUser');
  return r.table('posts').insert({
    createdAt: new Date(),
    author: remoteUser,
    text: markdown,
    postedOn: owner,
  }, {
    returnChanges: true,
  }).run(r.conn).then(results => {
    return results.changes[0].new_val;
  });
};

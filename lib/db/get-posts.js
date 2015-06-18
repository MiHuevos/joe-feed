const r = require('rethinkdb');
const sliceAt = require('utils/slice-at');

const getPosts = ({ owner }) => {
  const ownerId = sliceAt(owner);
  const isGroup = owner === ownerId;

  return r.table('posts').filter(post => (
    post('postedOn').eq(owner) &&
    (isGroup || post('author').eq(ownerId))
  )).run(r.conn).then(r => r.toArray());
};

module.exports = getPosts;

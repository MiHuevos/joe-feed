const r = require('rethinkdb');
const Promise = require('bluebird');

module.exports = ({ user, owner }) => {
  if (!user || !owner) return Promise.reject('please provide user and owner');
  return r.table('owners').filter({ id: user }).update({
    favorites: r.row('favorites').append(owner).setDifference(
      r.row('favorites').setIntersection([owner])
    ),
  }, { returnChanges: true }).run(r.conn).then(data => data.changes[0].new_val.favorites);
};

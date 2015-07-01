const r = require('rethinkdb');
const Promise = require('bluebird');

module.exports = ({ user, owner, toFavorite }) => {
  if (!user || !owner) return Promise.reject('please provide user and owner');
  if (typeof toFavorite !== 'boolean') return Promise.reject('please provide a bool toFavorite');
  return r.table('owners').filter({ id: user }).update({
    favorites: toFavorite ? (
      r.row('favorites').append(owner).distinct()
    ) : (
      r.row('favorites').difference([owner])
    ),
  }, { returnChanges: true }).run(r.conn).then(data => data.changes[0].new_val.favorites);
};

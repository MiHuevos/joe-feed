const r = require('rethinkdb');
const sliceAt = require('utils/slice-at');

const getOwners = (ownerIds) => {
  if (!Array.isArray(ownerIds)) ownerIds = [ownerIds];
  return r.table('owners').filter(owner => (
    r.expr(ownerIds.map(ownerId => sliceAt(ownerId))).contains(owner("id"))
  )).run(r.conn).then(owners => owners.toArray());
};

module.exports = getOwners;

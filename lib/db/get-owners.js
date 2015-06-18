const r = require('rethinkdb');

const getOwners = (ownerIds) => {
  return r.table('owners').filter(owner => (
    r.expr(ownerIds).contains(owner("id"))
  )).run(r.conn).then(owners => owners.toArray());
};

module.exports = getOwners;

const sliceAt = require('utils/slice-at');

module.exports = ({ owners, owner }) => {
  const ownerData = owners.filter(ownerObj => (
    ownerObj.get('id') === sliceAt(owner)
  )).first();
  return ownerData ? ownerData.toJS() : {};
};

const sliceAt = require('utils/slice-at');

module.exports = ({ owner, author, authorGroups }) => {
  if (!owner || !author) return false;
  const realOwner = sliceAt(owner);
  const isGroup = realOwner === owner;
  return (
    (!isGroup && realOwner === author) ||
    (isGroup && authorGroups.indexOf(realOwner) !== -1)
  );
};

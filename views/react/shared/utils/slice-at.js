const sliceAt = (owner) => (
  owner.charAt(0) === '@' ? owner.slice(1) : owner
);

module.exports = sliceAt;

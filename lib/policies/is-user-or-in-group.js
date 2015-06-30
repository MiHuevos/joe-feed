const allowedToPost = require('utils/allowed-to-post');

module.exports = ({ ownerInParams }) => (req, res, next) => {
  const allowed = allowedToPost({
    owner: ownerInParams ? req.params.owner : req.body.owner,
    author: req.remoteUser,
    authorGroups: req.adGroups,
  });
  if (!allowed) return res.status(403).send({ error: 'user not allowed to post', status: 403 });
  return next();
};

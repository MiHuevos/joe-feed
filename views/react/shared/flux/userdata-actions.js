const request = require('superagent');

function* toggleFavorite(ownerId, toFavorite) {
  var favorites = [].concat(window.flux.state.userData.favorites);
  if (!toFavorite) {
    var index = favorites.indexOf(ownerId);
    if (index > -1) favorites.splice(index, 1);
    yield favorites;
  } else {
    yield favorites.concat(ownerId);
  }
  yield new Promise((resolve, reject) => {
    request.put('/api/favorites').send({ owner: ownerId, toFavorite }).end((err, res) => {
      if (err) return reject(err);
      return resolve(res.body.favorites);
    });
  });
}

module.exports = {
  toggleFavorite,
};

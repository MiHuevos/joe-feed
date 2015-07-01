const request = require('superagent');

module.exports = {
  toggleFavorite(ownerId) {
    return new Promise((resolve, reject) => {
      request.put('/api/favorites').send({ owner: ownerId }).end((err, res) => {
        if (err) return reject(err);
        return resolve(res.body.favorites);
      });
    });
  }
};

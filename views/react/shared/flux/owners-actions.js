const request = require('superagent');

module.exports = {
  fetchOwnersData(ids) {
    return new Promise((resolve, reject) => {
      request.get(`/api/owners?ids=${ids.join(',')}`, (err, res) => {
        if (err) return reject(err);
        resolve(res.body.owners);
      });
    });
  }
};

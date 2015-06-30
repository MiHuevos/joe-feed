const request = require('superagent');

module.exports = {
  fetchPostsData(owner) {
    return new Promise((resolve, reject) => {
      request(`/api/posts?ownerId=${owner}`, (err, res) => {
        if (err) return reject(err);
        resolve(res.body.posts);
      });
    });
  },
  createPost({ owner, markdown }) {
    return new Promise((resolve, reject) => {
      request.post(`/api/posts`).send({
        markdown,
        owner
      }).end((err, res) => {
        if (err) return reject(err);
        resolve(res.body.post);
      });
    });
  }
};

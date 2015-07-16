const request = require('superagent');
const uuid = require('uuid');

export function* createPost({ owner, markdown }) {
  const uniqueId = uuid();
  yield {
    text: markdown,
    id: uniqueId,
    postedOn: owner,
    author: window.flux.state.userData.remoteUser,
    createdAt: new Date().toISOString(),
  };
  yield new Promise((resolve, reject) => {
    request.post(`/api/posts`).send({
      owner,
      markdown,
      uniqueId
    }).end((err, res) => {
      if (err) return reject(err);
      resolve(res.body.post);
    });
  });
}

export function* deletePost({ id }) {
  yield {
    id: id,
  };

  yield new Promise((resolve, reject) => {
    request.del(`/api/posts/${id}`).end((err, res) => {
      if (err || res.status !== 200) return reject(new Error('not saved'));
      return resolve({ id });
    });
  });
}

export function* fetchPostsData(owner) {
  yield new Promise((resolve, reject) => {
    request(`/api/posts?ownerId=${owner}`, (err, res) => {
      if (err) return reject(err);
      resolve(res.body.posts);
    });
  });
}

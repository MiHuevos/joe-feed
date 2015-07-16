import r from 'rethinkdb';
import Promise from 'bluebird';

const missing = (field) => {
  return Promise.reject({ status: 400, missing: field });
};

export default function deletePost({ adGroups, remoteUser, id }) {
  if (typeof id !== 'string') return missing('id');
  return r.table('posts').filter((postDoc) => (
    r.and(
      postDoc('id').eq(id),
      r.or(
        postDoc('author').eq(remoteUser),
        r.expr(adGroups).contains(postDoc('postedOn'))
      )
    )
  )).delete().run(r.conn).then(results => results.deleted);
}

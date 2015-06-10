Poster
======

Simple posting for organization - based on Active Directory and `REMOTE_USER`.

Isomorphic
----------

The project uses `redux` and `React Router` for using isomorphic flux.
That means that when we render by the server, we should give the stores already initialized to the `React.render` method.

pseudo code:

```js
Router.run(routes, req.url, (Handler, state) => {
  if (state.notFound) {
    return res.status(404).send("y u do dis");
  }

  // Lets say we can get `/@user` or `/group`
  var queryData = req.url.charAt(0) === '@' ? {
    ownerType: 'user',
    owner: req.params.owner.slice(1)
  } : {
    ownerType: 'group',
    owner: req.params.owner
  };

  getInitializedStoresFor(req.headers.remoteUser, queryData).then(flux => {
    res.render('react', {
      mainView: React.renderToString(<App stores={ flux } />)
    });
  });
});
```

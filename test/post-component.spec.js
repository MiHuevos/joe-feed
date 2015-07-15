import Post from '../views/react/screens/App/screens/Owner/post';
import React from 'react';
import { expect } from 'chai';

describe('Post', () => {
  it('should be okay', () => {
    var poster = <Post id="id" text="Hello *darling*" owner={{ name: 'Gal', id: 'schniz' }} />;
    expect(poster).to.be.ok;
  });
});

module.exports = {
  getInitialState() {
    return [{
      id: 'one_two_three',
      title: 'gal hagever',
      likedBy: ['gal', 'kfir'],
      owner: {
        type: 'group',
        name: 'magma'
      }
    }, {
      id: 'kakikaki',
      title: 'whos the man?',
      likedBy: ['kfir'],
      owner: {
        type: 'user',
        name: 'gal'
      }
    }];
  }
};

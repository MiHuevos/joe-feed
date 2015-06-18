const arrToObj = (arr) => arr.reduce((newObj, arrItem) => {
  newObj[arrItem.id] = arrItem;
  return newObj;
}, {});

module.exports = arrToObj;

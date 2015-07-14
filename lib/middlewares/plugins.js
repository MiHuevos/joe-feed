import { promisifyAll } from 'bluebird';
var fs = promisifyAll(require('fs'));
import { resolve } from 'path';
var pluginRegex = /^joe-feed-.*-plugin$/;

export default function callMiddlewares(app) {
  fs.readdirAsync(resolve(__dirname, '../../node_modules')).then(pluginDirectories => (
    pluginDirectories.filter(
      pluginDirectory => pluginDirectory.match(pluginRegex)
    ).forEach(plugin => require(plugin)(app))
  )).catch(err => {
    console.log('cannot load plugins :(', err.message, err.stack);
  });
}

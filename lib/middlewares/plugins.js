import { promisifyAll } from 'bluebird';
var fs = promisifyAll(require('fs'));
import { resolve } from 'path';
var pluginRegex = /^joe-feed-.*-plugin$/;

export default function callMiddlewares(app) {
  fs.readdirAsync(resolve(__dirname, '../../node_modules')).then(pluginDirectories => (
    pluginDirectories.filter(pluginDirectory => pluginDirectory.match(pluginRegex))
  )).then(pluginDirectories => {
    pluginDirectories.forEach(plugin => require(plugin)(app));
  });
}

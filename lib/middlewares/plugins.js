import { promisifyAll } from 'bluebird';
var fs = promisifyAll(require('fs'));
import { resolve } from 'path';
var pluginRegex = /^joe-feed-.*-plugin$/;
var debug = require('debug')('joe-feed:plugins');

export default function callMiddlewares(app) {
  try {
    var plugins = fs.readdirSync(resolve(__dirname, '../../node_modules')).filter(
      pluginDirectory => pluginDirectory.match(pluginRegex)
    ).reduce((pluginArray, plugin) => {
      require(plugin)(app);
      return pluginArray.concat(plugin);
    }, []);
    debug(`loaded ${plugins.length} plugins:`);
    plugins.forEach(plugin => debug(`- ${plugin}`));
  } catch(err) {
    debug('cannot load plugins.', err.message, err.stack);
  }
}

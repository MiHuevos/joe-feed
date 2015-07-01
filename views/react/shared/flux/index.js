const Microcosm = require('microcosm');
const React = require('react');
const PostsStore = require('./posts-store');
const OwnersStore = require('./owners-store');
const UserDataStore = require('./userdata-store');

class Flux extends Microcosm {
  constructor() {
    super();
    this.addStore('posts', PostsStore);
    this.addStore('owners', OwnersStore);
    this.addStore('userData', UserDataStore);
  }
}

/**
 * listenToStore decorator for Microcosm.
 *
 * Usage:
 * ------
 * ```
 * @listen('storeName') // or @listen(['storeOne', 'storeTwo'])
 * class Component extends React.Component {
 * 	render() {
 * 		return (<div>{ this.props.storeName.somethingInTheStore }</div>);
 * 	}
 * }
 * ```
 *
 * @param  {Array|string} storeNames The store names to listen to
 */
const listen = (storeNames) => {
  return (Component) => {
    if (typeof storeNames === 'string') storeNames = [storeNames];

    class StoreListenerComponent extends React.Component {
      static contextTypes = {
        flux: React.PropTypes.object,
      };

      render() {
        const stores = storeNames.reduce((storesObject, storeName) => {
          storesObject[storeName] = this.context.flux.get(storeName);
          return storesObject;
        }, {});

        // Get the state and put it in the component as a prop
        return (
          <Component {...this.props} flux={ this.context.flux } {...stores} />
        );
      }
    }

    return StoreListenerComponent;
  };
};

const route = (Component) => {
  return class RouteHelper extends React.Component {
    static childContextTypes = {
      flux: React.PropTypes.object,
    }

    getChildContext() {
      return {
        flux: this.props.route.flux
      };
    }

    render() {
      return (<Component {...this.props} />);
    }
  };
};

Flux.listen = listen;
Flux.route = route;
module.exports = Flux;

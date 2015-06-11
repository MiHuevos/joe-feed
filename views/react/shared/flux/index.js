const Microcosm = require('microcosm');
const React = require('react');
const PostStore = require('./post-store');

class Flux extends Microcosm {
  constructor() {
    super();
    this.addStore('posts', PostStore);
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
 *
 * @param  {Array|string} storeNames The store names to listen to
 */
const listen = (storeNames) => {
  return (Component) => {
    if (typeof storeNames === 'string') storeNames = [storeNames];

    class StoreListenerComponent extends React.Component {
      static contextTypes = {
        flux: React.PropTypes.object.isRequired,
      };

      componentDidMount() {
        // Subscribe and change state?
        // storeNames.forEach?
      }

      componentWillUnmount() {
        // Unsubscribe?
        // storeNames.forEach?
      }

      render() {
        const stores = storeNames.reduce((storesObject, storeName) => {
          storesObject[storeName] = this.context.flux.get(storeName);
          return storesObject;
        }, {});

        // Get the state and put it in the component as a prop
        return (
          <Component {...this.props} {...stores} />
        );
      }
    }

    return StoreListenerComponent;
  };
};

Flux.listen = listen;
module.exports = Flux;

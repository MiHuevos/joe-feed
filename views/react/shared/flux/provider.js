import React from 'react';
import Microcosm from 'microcosm';
import Im from 'immutable';

export default class Provider extends React.Component {
  static propTypes = {
    cosm: React.PropTypes.instanceOf(Microcosm).isRequired,
    children: React.PropTypes.node,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !Im.is(this.state.appState, nextState.appState);
  }

  constructor(props) {
    super(props);
    this.state = {
      appState: Im.Map(),
    };
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.updateState();
    this.props.cosm.subscribe(this.updateState);
  }

  componentWillUnmount() {
    this.props.cosm.unsubscribe(this.updateState);
  }

  updateState() {
    this.setState({
      appState: Im.fromJS(this.props.cosm.toJSON())
    });
  }

  render() {
    console.log('render...');
    return this.props.children;
  }
}

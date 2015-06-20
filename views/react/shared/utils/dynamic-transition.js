const React = require('react');
const dynamics = require('dynamics.js');

/**
 * <DynamicTransition
 * 	runTo={ isStart ? 'start' : 'finish' } - Specify which run, to update props...
 * 	onComplete={ () => {} }
 * 	onChange={ () => {} }
 * 	transition='spring' - Or an object
 * 	animateFrom={ {} }
 * 	animateTo={ {} }
 *  options={ {} }
 */
class DynamicTransition extends React.Component {
  static propTypes = {
    runTo: React.PropTypes.oneOf(['start', 'finish']),
    children: React.PropTypes.node.isRequired,
    animationProperties: React.PropTypes.object,
    animateFrom: React.PropTypes.object,
    animateTo: React.PropTypes.object,
    onComplete: React.PropTypes.func,
    onChange: React.PropTypes.func,
    type: React.PropTypes.oneOf([
      'spring',
      'bounce',
      'forceWithGravity',
      'gravity',
      'easeInOut',
      'easeIn',
      'easeOut',
      'linear',
      'bezier'
    ]),
  };

  static defaultProps = {
    onComplete: () => {},
    onChange: () => {},
  };

  componentDidMount() {
    this.updateAnimation(this.props, {});
  }

  componentDidUpdate() {
    this.updateAnimation(this.props, {});
  }

  runTo({ reverse }) {
    return reverse ? (this.props.runTo === 'start' ? 'finish' : 'start') : this.props.runTo;
  }

  animationProperties() {
    return {
      type: dynamics[this.props.type],
      frequency: 200,
      friction: 200,
      duration: 400,
      complete: this.props.onComplete,
      change: this.props.onChange,
      ...this.props.animationProperties
    };
  }

  updateAnimation(nextProps, { reverse }) {
    const runTo = this.runTo({ reverse });
    const domNode = React.findDOMNode(this.refs.animated);
    setTimeout(() => {

      dynamics.animate(
        domNode,
        (runTo === 'start') ? this.props.animateFrom : this.props.animateTo,
        this.animationProperties()
      );
    }, 10);
  }

  render() {
    return (
      <this.props.component ref="animated" style={ this.props.style }>
        { this.props.children }
      </this.props.component>
    );
  }
}

module.exports = DynamicTransition;

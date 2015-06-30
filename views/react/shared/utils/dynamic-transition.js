const React = require('react');
const dynamics = require('dynamics.js');

/**
 * Using dynamics.js to transition things or just animate
 * ------------------------------------------------------
 * props:
 *  - runTo               enum("start", "finish)       - which way to run.
 *  - onComplete          callback
 *  - onChange            callback
 *  - type                enum(look at dynamicjs docs) - how to run it.
 *  - animateFrom         object                       - Start position for the animation (A)
 *  - animateTo           object                       - End position for the animation (B)
 *  - animationProperties object                       - animation properties + more options for dynamics.js
 * ------------------------------------------------------
 * <DynamicTransition
 * 	runTo={ this.state.animationToggle ? 'start' : 'finish' }
 * 	onComplete={ () => {} }
 * 	onChange={ () => {} }
 * 	type='spring'
 * 	animateFrom={{ translateX: 0 }}
 * 	animateTo={{ translateX: -200 }}
 *  animationProperties={{
 *    friction: 100,
 *    duration: 1200,
 *  }}
 * >
 *   <span>Hello!</span>
 * </span>
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
    this.updateAnimation();
  }

  componentDidUpdate() {
    this.updateAnimation();
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

  updateAnimation() {
    const runTo = this.props.runTo;
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

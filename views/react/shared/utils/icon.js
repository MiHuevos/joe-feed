const React = require('react');

if (process.env.IS_WEBPACK) {
  // require css
  require('material-design-iconfont/style.css');
}

class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    verticalAlign: React.PropTypes.oneOf([
      "middle",
      "top",
      "bottom"
    ])
  };

  render() {
    return (
      <span
        className={ `md md-${this.props.name.split(" ").join("-") }` }
        style={{
          verticalAlign: this.props.verticalAlign || 'middle',
          fontSize: `${this.props.size}em`,
        }}
      />
    );
  }
}

module.exports = Icon;

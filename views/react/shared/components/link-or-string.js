const React = require('react');
const { Link } = require('react-router');

class LinkOrString extends React.Component {
  static propTypes = {
    to: React.PropTypes.string,
    children: React.PropTypes.node,
    toLink: React.PropTypes.bool,
    textColor: React.PropTypes.string,
    linkColor: React.PropTypes.string,
  };

  render() {
    const {
      toLink,
      children,
      to
    } = this.props;
    if (!toLink) return <span style={{ color: this.props.textColor }}>{children}</span>;
    return (
      <Link to={ to } style={{ color: this.props.linkColor }}>
        { children }
      </Link>
    );
  }
}

module.exports = LinkOrString;

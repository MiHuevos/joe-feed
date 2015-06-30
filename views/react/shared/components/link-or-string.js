const React = require('react');
const { Link } = require('react-router');

class LinkOrString extends React.Component {
  static propTypes = {
    to: React.PropTypes.string,
    children: React.PropTypes.node,
    toLink: React.PropTypes.bool,
  };

  render() {
    const {
      toLink,
      children,
      to
    } = this.props;
    if (!toLink) return <span>{children}</span>;
    return (
      <Link to={ to }>
        { children }
      </Link>
    );
  }
}

module.exports = LinkOrString;

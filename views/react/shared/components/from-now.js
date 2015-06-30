const React = require('react');
const moment = require('moment');

class FromNow extends React.Component {
  static propTypes = {
    date: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.refreshState = this.refreshState.bind(this);
    this.state = {
      refreshed: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.refreshState, 2000);
  }

  refreshState() {
    this.setState({ refreshed: this.state.refreshed + 1 });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const momentItem = moment(this.props.date);
    const dateTimeString = momentItem.format("YYYY-MM-DD hh:mm");

    return (
      <time dateTime={ dateTimeString } title={ dateTimeString }>
        { momentItem.fromNow() }
      </time>
    );
  }
}

module.exports = FromNow;

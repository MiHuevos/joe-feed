const React = require('react');

const colors = require('utils/colors');

class SplitterLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  render() {
    return (
      <hr
        onMouseEnter={ () => this.setState({ isHover: true }) }
        onMouseLeave={ () => this.setState({ isHover: false }) }
        style={{
          opacity: 0.1,
          marginTop: '1em',
          marginBottom: '1em',
          transition: 'all 0.2s ease',
          width: '90%',
          display: 'block',
          borderBottom: `1px solid ${this.state.isHover ? colors.blue.dark : colors.blue.darker}`,
          borderTop: 0,
        }}
      />
    );
  }
}

module.exports = SplitterLine;

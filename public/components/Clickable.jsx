var React = require('react');

var Clickable = React.createClass({
  propTypes: {
    displayText: React.PropTypes.string.isRequired
  },

  clicked: function () {
    this.props.buttonClicked(this);
  },

  render: function () {
    return(
      <button onClick={this.clicked}> {this.props.displayText} </button>
    );
  }
});

module.exports = Clickable;

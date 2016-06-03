var React = require('react');

var CommentSubmit = React.createClass({

  getInitialState: function() {
    return {value: 'Tell everyone your insights...'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <form className="commentForm">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      <input type="submit" value="Post" />

      </form>
    );
  }

});

module.exports = CommentSubmit;

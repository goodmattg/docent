var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var actions = require('../actions/actions.js');
var initialState = require('../initialCondition/initialCondition.js');

var Hathyst = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  },

  render: function () {
    return (<h2> PARTY </h2>);
  }
});

module.exports = Hathyst;

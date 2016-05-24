var React = require('React');
var Still = require('./Still.jsx');

var Portfolio = React.createClass({

propTypes: {
  initialStills: React.PropTypes.array.isRequired
},

// Initial state should match props
getInitialState: function () {
  return {stills: this.props.initialStills};
},

 // Empty the portfolio
clearStills: function () {
 this.setState({stills: []});
},

addStill: function (newStill) {
  this.setState(function(state, props) {
    return {stills: this.state.stills.concat(newStill)};
  });
},

render: function () {

  var stillComponents = this.props.initialStills.map(function(raw, index) {
    return (<Still key={index} imageAndCaption={raw} />);
  });

 // Render each of stills in the portfolio - determine how to do this with flexbox pattern
 return(
  <div className='porfolioContainer'>
    {stillComponents}
  </div>
 );
}

});

module.exports = Portfolio;

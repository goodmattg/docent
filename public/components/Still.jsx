var React = require('React');

var Still = React.createClass({

propTypes: {
  imageAndCaption: React.PropTypes.object.isRequired
},

render: function () {
  return(
  <img height="50" width="50" src={'data:image/jpeg;base64,' + this.props.imageAndCaption.imageData}/>
  );
}

});

module.exports = Still;

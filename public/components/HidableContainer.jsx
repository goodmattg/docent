var React = require('react');

var HidableContainer = React.createClass({

  render: function () {

    // Hidden container triggered. Render information
    if (this.props.trigger) {

      var displayInformation = [];
      for (let i = 0; i < this.props.info.length ; i++) {
        displayInformation.push(
          <h4> {this.props.info[i]} </h4>
        );
      }
      return (
        <div className={this.props.ident} style={{display: 'block'}}>
          {displayInformation}
        </div>
      );
    } else {
      // Hidden container not triggered. Render empty container.
      return (
        <div className={this.props.ident} style={{display: 'none'}}> </div>
      );
    }
  }

});

module.exports = HidableContainer;

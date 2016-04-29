var _ = require('lodash');
var React = require('react');
var PropTypes = React.PropTypes;
var actions = require('../actions/actions.js');
var initialState = require('../initialCondition/initialCondition.js');
var getNewImage = require('../helpers/getImage.js');

var Hathyst = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return this.props.store.getState();
  },

  componentDidMount: function () {
    // Subscribe to the store  on mount
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));

    // Promise on initial state before setting state
    var init = initialState();
    init.then(function (newState) {
      // this.setState(newState);
      this.props.store.dispatch(actions.setInitialAsync(newState));
      // BUG IS THAT THE INITIAL STATE SETS THE COMPONENT NOT THE STORE --> fire action?
    }.bind(this));
  },

  nextImage: function () {
    // Promise on new image download before firing action
    var newImage_PR = getNewImage(this.state.seen);
    newImage_PR.then(function (piece) {
      this.props.store.dispatch(actions.nextImage(piece));
    }.bind(this));
  },

  pressedNo: function () {
    // Only respond if in answer mode
    if (this.state.mode === 'answer') {
      this.props.store.dispatch(actions.changeMode('no'));
    }
  },

  pressedYes: function () {
        // Only respond if in answer mode
    if (this.state.mode === 'answer') {
      this.props.store.dispatch(actions.changeMode('yes'));
    }
  },

  render: function () {
    var isNoMode = (this.state.mode === 'no' ? 'block' : 'none');
    var isYesMode = (this.state.mode === 'yes' ? 'block' : 'none');
    var isAnswerMode = this.state.mode === 'answer';

    return (
    <div className = "view-container">
      <div className = "control-container">
        <button onClick={this.pressedYes}> YES </button>
        <button onClick={this.pressedNo}> NO </button>
        <button onClick={this.nextImage}> NEXT </button>
      </div>
      <div className = "no-container" style={{display: isNoMode}}>
        <h4> {this.state.caption.title} </h4>
        <h4> {this.state.caption.artist} </h4>
        <h4> {this.state.caption.year} </h4>
      </div>
      <div className = "congrats" style={{display: isYesMode}}>
        <h4> Wow look at you so cultured. </h4>
      </div>
      <div className = "image-container">
        <img src={'data:image/jpeg;base64,' + this.state.newImage} alt="boohoo" />
      </div>
    </div>
    );
  }
});

module.exports = Hathyst;

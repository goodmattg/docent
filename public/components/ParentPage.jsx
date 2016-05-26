var React = require('react');
var PropTypes = React.PropTypes;
var actions = require('../actions/actions.js');
var initialState = require('../initialCondition/initialCondition.js');
var getNewImage = require('../helpers/getImage.js');
var HidableContainer = require('./HidableContainer.jsx');
var Clickable = require('./Clickable.jsx');
var Portfolio = require('./Portfolio.jsx');

var ParentPage = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    // Store has a default empty state
    return this.props.store.getState();
  },

  // Subscribe to the store  on mount - parent page state matches store
  componentDidMount: function () {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
    // Promise on initial state before setting state
    var init = initialState();
    init.then(function (newState) {
      // this.setState(newState);
      this.props.store.dispatch(actions.setInitialAsync(newState));
    }.bind(this));

    // Component responds to key presses on page
    window.addEventListener("keydown", this.handleKeyPress);
  },

  buttonClicked: function (buttonComp) {
    // Button was clicked. Switch action based on
    switch (buttonComp.props.ident) {
      case 'yes_button':
        if (this.state.mode === 'answer') {
          this.props.store.dispatch(actions.changeMode('yes'));
        }
        break;

      case 'no_button':
        if (this.state.mode === 'answer') {
          this.props.store.dispatch(actions.changeMode('no'));
        }
        break;

      case 'next_button':
        var newImage_PR = getNewImage(this.state.seen);
          newImage_PR.then(function (piece) {
          this.props.store.dispatch(actions.nextImage(piece));
        }.bind(this));
        break;
    }
  },

  handleKeyPress: function(event) {
    if (this.state.initialStateReceived) {
      switch (event.keyCode) {
        case 37:
          // Only push to dash once per image
          if (this.state.dashPushOpen) {
            this.props.store.dispatch(actions.addStill());
          }
          break;
        case 39:
          // Get next image
          var newImage_PR = getNewImage(this.state.seen);
            newImage_PR.then(function (piece) {
            this.props.store.dispatch(actions.nextImage(piece));
          }.bind(this));
          break;
      }
    }
  },

  render: function() {

    var styles = {
      image: {
        maxWidth: '100%',
      }
    };

    var buttonGroup;
    if (this.state.initialStateReceived) {
      // Initial State Receieved - render buttons
      buttonGroup =
        <div className = "control-container">
          <Clickable key='yes-button' ident='yes_button' displayText='YES' buttonClicked={this.buttonClicked} />
          <Clickable key='no-button' ident='no_button' displayText='NO' buttonClicked={this.buttonClicked}/>
          <Clickable key='next-button' ident='next_button' displayText='NEXT' buttonClicked={this.buttonClicked}/>
        </div>;
    } else {
      buttonGroup =
        <div className = "control-container"> </div>;
    }

    var caption_info = [this.state.caption.title, this.state.caption.artist, this.state.caption.year];
    var confirmation_info = ['Wow look at you so cultured.'];

    return (
      <div className = 'windowRoot'>
        <div className = "mediaIntakePane">

          <HidableContainer key='no-container' ident='no-container'
          trigger={this.state.mode ==='no'} current_mode={this.state.mode}
          info={caption_info} />

          <HidableContainer key='yes-container' ident='yes-container'
          trigger={this.state.mode ==='yes'} current_mode={this.state.mode}
          info={confirmation_info} />

          <div className = "image-container">
            <img src={'data:image/jpeg;base64,' + this.state.newImage} style={styles.image} alt="boohoo" />
          </div>


        </div>

        <div className='dashboardPane'>
          <Portfolio initialStills={this.state.portfolio} />
        </div>
      </div>


    );



  }
});

module.exports = ParentPage;

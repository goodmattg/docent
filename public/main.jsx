var React = require('react');
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var reducers = require('./reducer/reducer.js').reducer; // IS THIS IMPORTED CORRECTLY
var Hathyst = require('./components/Hathyst.jsx');
var initialState = require('./initialCondition/initialCondition.js');
var actions = require('./actions/actions.js');

var store = createStore(reducers, initialState);

var hathyst = <Hathyst store={store}/>;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    hathyst,
    document.getElementById('container')
  );
});

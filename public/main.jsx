var React = require('react');
var ReactDOM = require('react-dom');
var fs = require('fs');
var $ = require('jquery');
var createStore = require('redux').createStore;
var reducers = require('./reducer/reducer.js').reducer; // IS THIS IMPORTED CORRECTLY
var Hathyst = require('./components/Hathyst.jsx');
var actions = require('./actions/actions.js');

// Initial state of the store is empty
var store = createStore(reducers, {newImage: '', caption: {artist: '', title: '', year: ''}});
var hathyst = <Hathyst store={store}/>;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    hathyst,
    document.getElementById('container')
  );
});

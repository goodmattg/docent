var React = require('react');
var ReactDOM = require('react-dom');
var fs = require('fs');
var $ = require('jquery');
var createStore = require('redux').createStore;
var reducers = require('./reducer/reducer.js').reducer; // IS THIS IMPORTED CORRECTLY
var Hathyst = require('./components/Hathyst.jsx');
var ParentPage = require('./components/ParentPage.jsx');
var actions = require('./actions/actions.js');

// Create store with dummy state - initalStateReceived is false
var store = createStore(reducers,
                        {newImage: '',
                          caption: {
                            artist: '',
                            title: '',
                            year: ''
                          },
                          initialStateReceived: 'false'}
                        );

var topLevelPage = <ParentPage store={store}/>;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    topLevelPage,
    document.getElementById('container')
  );
});

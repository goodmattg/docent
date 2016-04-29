
var reducer = function (state, action) {

  switch (action.type) {

  case 'NEXTIMAGE':
    return Object.assign({}, JSON.parse(action.data), {mode: 'answer'});

  case 'CHANGEMODE':
    return Object.assign({}, state, {mode: action.mode});

  case 'SETINITIAL_ASYNC':
    return Object.assign({}, action.data);
  }
  return state;
};

module.exports = {
  reducer: reducer
};


  // case 'CHANGEMODE':
  //   return Object.assign({}, state, {mode: action.mode});

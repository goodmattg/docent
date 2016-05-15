
var reducer = function (state, action) {

  switch (action.type) {

  case 'NEXTIMAGE':
    return Object.assign({}, JSON.parse(action.newPiece), {mode: 'answer'});

  case 'CHANGEMODE':
    return Object.assign({}, state, {mode: action.newMode});

  case 'SETINITIAL_ASYNC':
    return Object.assign({}, action.initialState, {initialStateReceived: 'true'});
  }
  return state;
};

module.exports = {
  reducer: reducer
};


/*
State Description:

{
  image: {....}
  mode: 'string''
  isMounted: boolean
}

*/

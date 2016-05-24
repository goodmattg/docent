
var reducer = function (state, action) {

  switch (action.type) {

  case 'NEXTIMAGE':
    return Object.assign({}, state, JSON.parse(action.newPiece), {mode: 'answer', dashPushOpen: true});

  case 'CHANGEMODE':
    return Object.assign({}, state, {mode: action.newMode});

  case 'SETINITIAL_ASYNC':
    return Object.assign({}, action.initialState,
      {initialStateReceived: true, portfolio: [], dashPushOpen: true});

  case 'ADDSTILL':
    var newPortfolio = state.portfolio.concat({caption: state.caption, imageData: state.newImage});
    return Object.assign({}, state, {portfolio: newPortfolio, dashPushOpen: false});
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

var reducer = function (state, action) {

  switch(action.type) {
    case 'IMPORT_SEED':
    return _.assign({}, state, {cells: action.seed});
  }



};

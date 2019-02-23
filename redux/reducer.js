import {actionTypes} from './actions';

export const initState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  userList: null
};

function reducer (state = initState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{error: action.error}
      };

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{count: state.count + 1}
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{count: state.count - 1}
      };

    case actionTypes.RESET:
      return {
        ...state,
        ...{count: initState.count}
      };

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{userList: action.data}
      };

    default:
      return state;
  }
}

export default reducer;

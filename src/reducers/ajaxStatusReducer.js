import * as types from '../actions/actyonTypes';
import initialState from './initialState';

// just a convention.. every ajax call has to have and with _SUCCESS
function actionTypeEndWithSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type == types.AJAX_CALL_ERROR ||
    actionTypeEndWithSuccess(action.type)) {
    return state - 1;
  }

  return state;
}

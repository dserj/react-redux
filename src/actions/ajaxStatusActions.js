import * as types from './actyonTypes';

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

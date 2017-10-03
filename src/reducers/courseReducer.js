import * as types from '../actions/actyonTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action){
  switch (action.type)
  {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state, // spread operator - spreads values from array one by one
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id), // spread operator - iterable, so we can do filter.. filter returns a brand new array
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}

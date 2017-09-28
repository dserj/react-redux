import * as types from './actyonTypes';
import courseApi from '../api/mockCourseApi';

function loadCoursesSuccess(courses){
  return {
    type: types.LOAD_COURSES_SUCCESS, course: courses
  };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

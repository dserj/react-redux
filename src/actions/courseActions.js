import * as types from './actyonTypes';
import courseApi from '../api/mockCourseApi';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function loadCoursesSuccess(courses){
  return {
    type: types.LOAD_COURSES_SUCCESS, courses
  };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());

    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());

    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      // we could handle this in two ways:
      // - we can dispatch 'SAVE_COURSE_ERROR' action
      // - we can handle the rejected Promise at the call site, which in this case in ManageCoursePage
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

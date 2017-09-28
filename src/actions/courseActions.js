import * as types from './actyonTypes';

export function createCourse(course){
  return {
    type: types.CREATE_COURSE, course
  };
}

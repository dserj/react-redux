import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}
               />
        <CourseList courses={courses}/>
        </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  return {
    // state.courses ==>> defined in root reducer /reducers/index.js
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch){
  return {
  };
}

// connect is just returning a function
// if we omit 2nd param we automatically getting this.props.dispatch in our class
// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: "" }
    };

    this.onTiteChange = this.onTiteChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTiteChange(e){
    const course = this.state.course;
    course.title = e.target.value;
    this.setState({ course: course });
  }

  onClickSave() {
    // we can do this because of ommiting 2nd argument of "connect"
    //this.props.dispatch(courseActions.createCourse(this.state.course));
    this.props.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add course</h2>
        <input
          type="text"
          onChange={this.onTiteChange}
          value={this.state.course.title} />

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  createCourse: PropTypes.func.isRequired,
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
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

// connect is just returning a function
// if we omit 2nd param we automatically getting this.props.dispatch in our class
// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

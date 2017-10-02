import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseAction from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursesPage extends React.Component {
  constructor(props, context)
  {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
  }

  updateCourseState(e) {
    const field = e.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = e.target.value;
    return this.setState({ course });
  }

  render()
  {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        course={this.state.course}
        errors={this.state.errors}
      />
    );
  }
}

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps)
{
  let course = {
    id: "",
    title: "",
    watchHref: "",
    authorId: "",
    length: "",
    category: ""
  };

  const authorsFormattedForDropdown = state.authors.map(a => {
    return {
      value: a.id,
      text: a.firstName + ' ' + a.lastName
    };
  });

  return {
    course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch)
{
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);

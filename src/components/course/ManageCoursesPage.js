import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseAction from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursesPage extends React.Component {
  constructor(props, context)
  {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props.course.id != nextProps.course.id){
      // Necessary to populate form when existing course is loaded directly
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(e) {
    const field = e.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = e.target.value;
    return this.setState({ course });
  }

  saveCourse(e) {
    e.preventDefault();
    this.setState({ saving: true });
    let course = Object.assign({}, this.state.course);
    this.props.actions.saveCourse(course)
      .then(() => this.redirect());
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved');
    // another way to access router. We need to "Pull in the React Router" see below
    this.context.router.push('/courses');
  }

  render()
  {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

// Pull in the React Router context so router is available on this.context.router
// We could set is required property
ManageCoursesPage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id); // filter returns an array
  if (course.length) return courses[0];
  return null;
}

// ownProps ==>> is the reference to the component props
// needed for populating props
function mapStateToProps(state, ownProps)
{
  const courseId = ownProps.params.id; // from the path `/course/:id` see routes.js Route path="course/:id"

  let course = {
    id: "",
    title: "",
    watchHref: "",
    authorId: "",
    length: "",
    category: ""
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

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

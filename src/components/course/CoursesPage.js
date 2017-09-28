import React, { PropTypes } from 'react';

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
    alert(`Saving ${this.state.course.title}`);
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
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

export default CoursesPage;

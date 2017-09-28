import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseAction from '../../actions/courseActions';

class ManageCoursesPage extends React.Component {
  constructor(props, context)
  {
    super(props, context);
  }

  render()
  {
    return (
      <h1>Manage Course</h1>
    );
  }
}

ManageCoursesPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps)
{
  return {
    state
  };
}

function mapDispatchToProps(dispatch)
{
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);

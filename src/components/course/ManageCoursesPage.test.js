import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';

// we can use name import here, because we did export of class ManageCoursesPage
// in order to use not connected class
import {ManageCoursesPage} from './ManageCoursesPage';

describe('Manage Course Page', () => {
  it('sets error message when trying to savve empty title', () => {

    const props = {
      authors: [],

      // we need to mock actions because mapDispatchToProps does not work with this approach
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: {
        id: "",
        title: "",
        watchHref: "",
        authorId: "",
        length: "",
        category: ""
      }
    };

    // mount ==>> creates full DOM in memory, does render child components
    // const wrapper = mount(<Provider store={store}><ManageCoursesPage /></Provider>); we can use this approach to test connected components

    // second approach needs ManageCoursesPage to be exported (see: export class ManageCoursesPage)
    // so we are using not connected class
    // and we need to pass options for the class, so mapStateToProps does not work with this approach
    // so we put empty array
    const wrapper = mount(<ManageCoursesPage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SearchTabPanel from '../../components/searchTabPanel/SearchTabPanel';

describe('<SearchTabPanel />', () => {
  const searchTabPanel = shallow(
    <SearchTabPanel value={0} index={0}>
      Tab Panel
    </SearchTabPanel>
  );

  it('should contain a div witch id is simple-tabpanel-0', () => {
    expect(searchTabPanel.find('#simple-tabpanel-0')).to.have.length(1);
  })

  it('should contain the text "Tab Panel"', () => {
    expect(searchTabPanel.text()).to.be.equal('Tab Panel');
  })
})
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TabPanel from '../../components/tabPanel/TabPanel';

describe('<TabPanel />', () => {
  const searchTabPanel = shallow(
    <TabPanel value={0} index={0}>
      Tab Panel
    </TabPanel>
  );

  it('should contain a div witch id is tabpanel-0', () => {
    expect(searchTabPanel.find('div#tabpanel-0')).to.have.length(1);
  })

  it('should contain the text "Tab Panel"', () => {
    expect(searchTabPanel.text()).to.be.equal('Tab Panel');
  })
})
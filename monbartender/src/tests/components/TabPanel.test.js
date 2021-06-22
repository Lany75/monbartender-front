import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TabPanel from '../../components/tabPanel/TabPanel';

describe('<TabPanel />', () => {
  const tabPanel = shallow(
    <TabPanel value={0} index={0}>
      Tab Panel
    </TabPanel>
  );

  it('should contain a div witch id is simple-tabpanel-0', () => {
    expect(tabPanel.find('#simple-tabpanel-0')).to.have.length(1);
  })

  it('should contain the text "Tab Panel" in children props', () => {
    expect(tabPanel.props().children).to.equal('Tab Panel');
  })
})
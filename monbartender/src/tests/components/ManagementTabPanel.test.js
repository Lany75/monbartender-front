import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Box, Typography } from '@material-ui/core';

import ManagementTabPanel from '../../components/managementTabPanel/ManagementTabPanel';

describe('<ManagementTabPanel />', () => {
  const managementTabPanel = shallow(
    <ManagementTabPanel value={0} index={0}>
      Tab Panel
    </ManagementTabPanel>
  );

  const tabPanel = managementTabPanel.find('#scrollable-auto-tabpanel-0');

  it('should contain a div witch id is scrollable-auto-tabpanel-0', () => {
    expect(tabPanel).to.have.length(1);
  })

  const box = tabPanel.find(Box);

  it('should contain a Box component', () => {
    expect(box).to.have.length(1);
  })

  it('should contain a Typography component', () => {
    expect(box.find(Typography)).to.have.length(1);
  })

  it('should contain the text "Tab Panel"', () => {
    expect(box.find(Typography).text()).to.be.equal('Tab Panel');
  })
})

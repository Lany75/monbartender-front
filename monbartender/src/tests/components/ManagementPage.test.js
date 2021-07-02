import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Tabs, Tab } from '@material-ui/core';

import ManagementPage from '../../components/managementPage/ManagementPage';

describe('<ManagementPage />', () => {
  const managementPage = shallow(<ManagementPage />);

  it('should contain a div witch className is management-title and text is "Gestion ..."', () => {
    const managementTitle = managementPage.find('div.management-title');
    expect(managementTitle).to.have.length(1);
    expect(managementTitle.text()).to.be.equal('Gestion ...');
  })

  const paper = managementPage.find(Paper);

  it('should contain a Paper component witch className is paper', () => {
    expect(paper).to.have.length(1);
    expect(paper.props()).to.have.property('className', 'paper');
  })

  const paperTabs = paper.find(Tabs);

  it('should contain a Tabs component with onChange attribute', () => {
    expect(paperTabs).to.have.length(1);
    expect(paperTabs.props().hasOwnProperty('onChange')).to.be.true;
  })

  it('should contain 5 Tab components witch id is management-tab-label', () => {
    expect(paperTabs.find(Tab)).to.have.length(5);
    paperTabs.find(Tab).map(pt => {
      expect(pt.props()).to.have.property('id', 'management-tab-label');
    })
  })

  it('should contain 5 TabPanel components', () => {
    expect(managementPage.find('TabPanel')).to.have.length(5);
  })
})

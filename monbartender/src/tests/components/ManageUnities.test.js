import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageUnities from '../../components/manageUnities/ManageUnities';

describe('<ManageUnities />', () => {
  const manageUnities = shallow(<ManageUnities />);
  const divManageUnities = manageUnities.find('div.manage-unities');

  it('should contain a div with className="manage-unities"', () => {
    expect(divManageUnities).to.have.length(1);
  })

  it('should contain a h4 tag with text="LES UNITES"', () => {
    expect(divManageUnities.find('h4')).to.have.length(1);
    expect(divManageUnities.find('h4').text()).to.be.equal('LES UNITES');
  })

  it('should contain a UnityAdd component', () => {
    expect(divManageUnities.find('UnityAdd')).to.have.length(1);
  })

  it('should contain a UnityList component', () => {
    expect(divManageUnities.find('UnityList')).to.have.length(1);
  })
})
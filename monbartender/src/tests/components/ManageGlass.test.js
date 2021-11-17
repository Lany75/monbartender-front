import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageGlass from '../../components/manageGlass/ManageGlass';

describe('<ManageGlass />', () => {
  const manageGlass = shallow(<ManageGlass />);
  const divManageGlass = manageGlass.find('div.manage-glass');

  it('should contain a div witch className="manage-glass"', () => {
    expect(divManageGlass).to.have.length(1);
  })

  it('should contain a h4 tag with text="LES VERRES"', () => {
    expect(divManageGlass.find('h4')).to.have.length(1);
    expect(divManageGlass.find('h4').text()).to.be.equal('LES VERRES');
  })

  it('should contain a GlassList component', () => {
    expect(divManageGlass.find('GlassList')).to.have.length(1);
  })
})

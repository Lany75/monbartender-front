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

  it('should contain a h4 tag witch text="LES VERRES"', () => {
    expect(divManageGlass.find('h4')).to.have.length(1);
    expect(divManageGlass.find('h4').text()).to.be.equal('LES VERRES');
  })

  it('should contain a GlassList component', () => {
    expect(divManageGlass.find('GlassList')).to.have.length(1);
  })

  it('should contain a GlassChange component', () => {
    expect(divManageGlass.find('GlassChange')).to.have.length(1);
  })

  it('should contain a GlassAdd component', () => {
    expect(divManageGlass.find('GlassAdd')).to.have.length(1);
  })
})

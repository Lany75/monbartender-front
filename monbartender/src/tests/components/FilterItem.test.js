import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { FormControlLabel } from "@material-ui/core";

import FilterItem from '../../components/filterItem/FilterItem';

const testItem = {
  CategorieIngredient: {
    id: "57459a23-14dc-43e7-b730-932cee95b477",
    nom: "JUS"
  },
  id: "38925fb2-2267-47c7-b62e-e134e41a51c7",
  nom: "Jus De Citron Vert"
}

describe('<FilterItem />', () => {
  const filterItem = shallow(<FilterItem item={testItem} />);
  const formControl = filterItem.find(FormControlLabel);

  it('should contain 1 FormControlLabel component with control and label attributes', () => {
    expect(formControl).to.have.length(1);
    expect(formControl.props()).to.have.property('control');
    expect(formControl.props()).to.have.property('label', 'Jus De Citron Vert');
  })
})
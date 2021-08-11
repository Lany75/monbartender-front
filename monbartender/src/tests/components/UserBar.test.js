import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import UserBar from '../../components/userBar/UserBar';

describe('<UserBar />', () => {
  const userBar = shallow(<UserBar />);
  const divUserBar = userBar.find('div.user-bar');

  it('should contain a div witch className="user-bar"', () => {
    expect(divUserBar).to.have.length(1);
  })

  it('should contain an UserBarIngredientAdd component', () => {
    expect(divUserBar.find('UserBarIngredientAdd')).to.have.length(1);
  })

  it('should contain an UserBarIngredientList component', () => {
    expect(divUserBar.find('UserBarIngredientList')).to.have.length(1);
  })
})
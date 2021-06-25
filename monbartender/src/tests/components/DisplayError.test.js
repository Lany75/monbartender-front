import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DisplayError from '../../components/displayError/DisplayError';

describe('<DisplayError />', () => {

  describe('It tests normal case with defined classe and componentName', () => {
    const displayError = shallow(<DisplayError classe='component-class' componentName='MonComposant' />);
    const pTag = displayError.find('p.component-class');

    it('should contain a p tag with className="component-class" and text "MonComposant ne peut pas être affiché"', () => {
      expect(pTag).to.have.length(1);
      expect(pTag.text()).to.be.equal('MonComposant ne peut pas être affiché');
    })
  })

  describe('It tests case with undefined classe', () => {
    const displayError = shallow(<DisplayError componentName='MonComposant' />);
    const pTag = displayError.find('p.default-class');

    it('should contain a p tag with className="default-class" and text "MonComposant ne peut pas être affiché"', () => {
      expect(pTag).to.have.length(1);
      expect(pTag.text()).to.be.equal('MonComposant ne peut pas être affiché');
    })
  })

  describe('It tests case with undefined componentName', () => {
    const displayError = shallow(<DisplayError classe='component-class' />);
    const pTag = displayError.find('p.component-class');

    it('should contain a p tag with className="component-class" and text "Ce composant ne peut pas être affiché"', () => {
      expect(pTag).to.have.length(1);
      expect(pTag.text()).to.be.equal('Ce composant ne peut pas être affiché');
    })
  })
})
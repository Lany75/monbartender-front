import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../App';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';

describe('<App />', () => {
  const app = shallow(<App />);
  it('should contain a div witch className is container', () => {
    expect(app.find('.container')).to.have.length(1);
  });

  it('should contain a Header component', () => {
    expect(app).to.contain(<Header />);
  })

  it('should contain a Main component', () => {
    expect(app).to.contain(<Main />);
  })

  it.skip('should contain a Footer component', () => {
    expect(app).to.contain(<Footer />);
  })

})

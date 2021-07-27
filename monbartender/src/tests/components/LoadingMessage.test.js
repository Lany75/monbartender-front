import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

describe('<LoadingMessage />', () => {
  const loadingMessage = shallow(<LoadingMessage message='Loading message ...' />);

  it('should contain a div witch className is loading-message', () => {
    expect(loadingMessage.find('div.loading-message')).to.have.length(1);
  })

  it('should contain the text "Loading message ..."', () => {
    expect(loadingMessage.find('div.loading-message').text()).to.be.equal('Loading message ...')
  })
})
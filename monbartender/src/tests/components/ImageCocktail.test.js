import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ImageCocktail from '../../components/imageCocktail/ImageCocktail';

describe('<ImageCocktail />', () => {
  const imageCocktail = shallow(
    <ImageCocktail
      classe='cocktail-card-image'
      reference='img_cocktail/bloodyMary.jpg'
      nom='Bloody Mary'
    />
  );
  const tagImg = imageCocktail.find('img');

  it('should contain an img tag with className="cocktail-card-image"', () => {
    expect(tagImg).to.have.length(1);
    expect(tagImg.props().className).to.be.equal('cocktail-card-image');;
  })

  it('should contain an img tag with alt="Bloody Mary"', () => {
    expect(tagImg).to.have.length(1);
    expect(tagImg.props().alt).to.be.equal('Bloody Mary');;
  })

  it.skip('should contain an img tag with src=undefined', () => {
    expect(tagImg).to.have.length(1);
    expect(tagImg.props().src).to.be.equal(undefined);;
  })
})
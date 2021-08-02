import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ImageCocktail from '../../components/imageCocktail/ImageCocktail';

describe('<ImageCocktail />', () => {

  describe('It tests normal case with defined "classe", "reference" and "nom"', () => {
    const imageCocktail = shallow(
      <ImageCocktail
        classe='cocktail-card-image'
        reference='img_cocktail/bloodyMary.jpg'
        nom='Bloody Mary'
      />
    );
    const tagImg = imageCocktail.find('img');

    it('should contain an img tag with className="cocktail-card-image", alt="Bloody Mary" and a src attribute', () => {
      expect(tagImg).to.have.length(1);
      expect(tagImg.props().className).to.be.equal('cocktail-card-image');
      expect(tagImg.props().alt).to.be.equal('Bloody Mary');;
      expect(tagImg.props()).to.have.property('src');
    })
  })

  describe('It tests case with undefined classe', () => {
    const imageCocktail = shallow(
      <ImageCocktail
        reference='img_cocktail/bloodyMary.jpg'
        nom='Bloody Mary'
      />
    );
    const tagImg = imageCocktail.find('img');

    it('should contain an img tag with className="cocktail-card-image", alt="Bloody Mary" and a src attribute', () => {
      expect(tagImg).to.have.length(1);
      expect(tagImg.props().className).to.be.equal('cocktail-card-image');
      expect(tagImg.props().alt).to.be.equal('Bloody Mary');;
      expect(tagImg.props()).to.have.property('src');
    })
  })

  describe('It tests case with undefined reference', () => {
    const imageCocktail = shallow(
      <ImageCocktail
        classe='cocktail-card-image'
        nom='Bloody Mary'
      />
    );
    const tagImg = imageCocktail.find('img');

    it('should contain an img tag with className="cocktail-card-image", alt="Bloody Mary" and a src attribute with default image', () => {
      expect(tagImg).to.have.length(1);
      expect(tagImg.props().className).to.be.equal('cocktail-card-image');
      expect(tagImg.props().alt).to.be.equal('Bloody Mary');;
      expect(tagImg.props()).to.have.property('src');
    })
  })

  describe('It tests case with undefined nom', () => {
    const imageCocktail = shallow(
      <ImageCocktail
        classe='cocktail-card-image'
        reference='img_cocktail/bloodyMary.jpg'
      />
    );
    const tagImg = imageCocktail.find('img');

    it('should contain an img tag with className="cocktail-card-image", alt="Une image de cocktail" and a src attribute', () => {
      expect(tagImg).to.have.length(1);
      expect(tagImg.props().className).to.be.equal('cocktail-card-image');
      expect(tagImg.props().alt).to.be.equal('Une image de cocktail');;
      expect(tagImg.props()).to.have.property('src');
    })
  })
})
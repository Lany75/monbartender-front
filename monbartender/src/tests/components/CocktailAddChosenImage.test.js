import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CocktailAddChosenImage from '../../components/cocktailAddChosenImage/CocktailAddChosenImage';
import ImageCocktail from '../../components/imageCocktail/ImageCocktail';

describe('<CocktailAddChosenImage />', () => {

  describe('it test case with chosenImage=null', () => {
    const cocktailAddChosenImage = shallow(<CocktailAddChosenImage chosenImage={null} refChosenImage='img_cocktail/noImageFound.jpg' />);

    it('should contain an ImageCocktail component', () => {
      expect(cocktailAddChosenImage.find(ImageCocktail)).to.have.length(1);
    })
  })

  describe('it test case with chosenImage!=null', () => {
    const cocktailAddChosenImage = shallow(<CocktailAddChosenImage chosenImage={'not null'} refChosenImage='img_cocktail/noImageFound.jpg' />);

    it('should contain an img tag with className="manage-cocktail-img" and alt="le cocktail"', () => {
      const img = cocktailAddChosenImage.find('img.manage-cocktail-img');
      expect(img).to.have.length(1);
      expect(img.props()).to.have.property('alt', 'le cocktail');
    })
  })
})
import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CocktailChosenImage from '../../components/cocktailChosenImage/CocktailChosenImage';
import ImageCocktail from '../../components/imageCocktail/ImageCocktail';

describe('<CocktailChosenImage />', () => {

  describe('it test case with chosenImage=null', () => {
    const cocktailChosenImage = shallow(<CocktailChosenImage chosenImage={null} refChosenImage='img_cocktail/noImageFound.jpg' />);

    it('should contain an ImageCocktail component', () => {
      expect(cocktailChosenImage.find(ImageCocktail)).to.have.length(1);
    })
  })

  describe('it test case with chosenImage!=null', () => {
    const cocktailChosenImage = shallow(<CocktailChosenImage chosenImage={'not null'} refChosenImage='img_cocktail/noImageFound.jpg' />);

    it('should contain an img tag with className="manage-cocktail-img" and alt="le cocktail"', () => {
      const img = cocktailChosenImage.find('img.manage-cocktail-img');
      expect(img).to.have.length(1);
      expect(img.props()).to.have.property('alt', 'le cocktail');
    })
  })
})
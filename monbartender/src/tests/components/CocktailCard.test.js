import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CocktailCard from '../../components/cocktailCard/CocktailCard';
import ImageCocktail from '../../components/imageCocktail/ImageCocktail';

const cocktailTest = {
  EtapesPreparations: [
    {
      id: "7fe02232-a8f4-456d-ad52-cde165adad16",
      numEtape: 1,
      texte: "Réalisez la recette dans un verre à mélange."
    },
    {
      id: "398ec5e2-7865-4808-9e76-49a475ac2288",
      numEtape: 2,
      texte: "Agiter les ingrédients dans un verre à mélange avec des glaçons (pour refroidir sans trop diluer)."
    }
  ],
  Ingredients: [
    {
      cocktails_ingredients: { quantite: "9", unite: "cl" },
      id: "e624bd35-e414-4874-a406-14a7d9d24231",
      nom: "Jus De Tomate"
    },
    {
      cocktails_ingredients: { quantite: "2", unite: "gouttes" },
      id: "13999790-02af-4b2e-9775-7ac19fc35f1b",
      nom: "Sauce Worcestershire"
    }
  ],
  Verre: { id: "0ec43307-8523-48c6-8fd9-06be72e484bd", nom: "Tumbler" },
  alcool: true,
  id: "b258592b-57ac-4bda-8e07-1d2697f20770",
  nom: "Bloody Mary",
  photo: "img_cocktail/bloodyMary.jpg",
};

describe('<CocktailCard />', () => {
  const cocktailCard = shallow(<CocktailCard cocktail={cocktailTest} />);
  const divCocktailCard = cocktailCard.find('.cocktail-card')

  it('should contain a div witch className is cocktail-card', () => {
    expect(divCocktailCard).to.have.length(1);
  })

  it('should contain an ImageCocktail component with props classe="cocktail-card-image"', () => {
    expect(divCocktailCard.find(ImageCocktail)).to.have.length(1);
    expect(divCocktailCard.find(ImageCocktail).props().classe).to.be.equal('cocktail-card-image');
  })

  it('should contain a p tag with className "cocktail-card-name" and text "Bloody Mary"', () => {
    expect(divCocktailCard.find('p')).to.have.length(1);
    expect(divCocktailCard.find('p').props().className).to.equal('cocktail-card-name');
    expect(divCocktailCard.find('p').text()).to.be.equal('Bloody Mary');
  })
})
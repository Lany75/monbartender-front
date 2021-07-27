import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import RecipePage from '../../components/recipePage/RecipePage';
import ImageCocktail from '../../components/imageCocktail/ImageCocktail';

const cocktailTest = {
  EtapesPreparations: [
    {
      id: "0d36c58c-ab65-4a5c-9fc5-f71d4022e3e6",
      numEtape: 1,
      texte: "Givrer le bord d'un verre à cocktail."
    },
    {
      id: "8788b31d-5f6e-48ba-a847-220255bb7e90",
      numEtape: 2,
      texte: "Verser la tequila, le cointreau et le jus de citron vert dans un shaker."
    },
    {
      id: "93ab24b2-bc51-4f9f-bdc9-0442cb71b3c5",
      numEtape: 3,
      texte: "Ajouter les glacons, et secouez vigoureusement pendant environ 10 secondes."
    },
    {
      id: "fd802959-a288-4265-b744-ad4e29feab2f",
      numEtape: 4,
      texte: "Versez dans le verre."
    },
    {
      id: "2e438d8a-093b-4b29-9e92-59271a94a03c",
      numEtape: 5,
      texte: "Décorer d'une rondelle de citron."
    },
  ],
  Ingredients: [
    {
      cocktails_ingredients: { quantite: "2", unite: "cl" },
      id: "38925fb2-2267-47c7-b62e-e134e41a51c7",
      nom: "Jus De Citron Vert"
    },
    {
      cocktails_ingredients: { quantite: "5", unite: "cl" },
      id: "a2631513-a18f-4629-8bef-90a773290709",
      nom: "Tequila"
    },
    {
      cocktails_ingredients: { quantite: "3", unite: "cl" },
      id: "5ef2e951-3704-43cf-b062-f60eac65ec5d",
      nom: "Triple Sec"
    }
  ],
  Verre: { id: "c69758d1-b4ad-4038-b157-205fd12d9ace", nom: "Verre à Cocktail" },
  alcool: true,
  id: "7e124810-e9a7-4724-ad48-c6a24bfaa1a5",
  nom: "Margarita",
  photo: "img_cocktail/margarita.jpg"
}

describe('<RecipePage />', () => {
  const recipePage = shallow(<RecipePage cocktail={cocktailTest} />)
  const divRecipePage = recipePage.find('div.recipe-page');

  it('should contain a div witch className is recipe-page', () => {
    expect(divRecipePage).to.have.length(1);
  })

  it('should contain a span witch className is "cocktail-name" and text is "MARGARITA"', () => {
    expect(divRecipePage.find('span.cocktail-name')).to.have.length(1);
    expect(divRecipePage.find('span.cocktail-name').text()).to.be.equal('MARGARITA');
  })

  it('should contain an ImageCocktail component', () => {
    expect(divRecipePage.find(ImageCocktail)).to.have.length(1);
  })

  const divCocktailIngredients = divRecipePage.find('div.cocktail-ingredients');

  it('should contain a div witch className="cocktail-ingredients"', () => {
    expect(divCocktailIngredients).to.have.length(1);
  })

  it('should contain a span witch className="sous-titre" and text is "Ingrédients : "', () => {
    expect(divCocktailIngredients.find('span.sous-titre')).to.have.length(1);
    expect(divCocktailIngredients.find('span.sous-titre').text()).to.be.equal('Ingrédients : ');
  })

  it('should contain an ul tag and 3 li tags witch className is "ingredient"', () => {
    expect(divCocktailIngredients.find('ul')).to.have.length(1);
    expect(divCocktailIngredients.find('ul').find('li.ingredient')).to.have.length(3);
  })

  const divCocktailGlass = divRecipePage.find('div.cocktail-glass');

  it('should contain a div witch className="cocktail-glass"', () => {
    expect(divCocktailGlass).to.have.length(1);
  })

  it('should contain a span witch className="sous-titre" and text is "Verre à utiliser : "', () => {
    expect(divCocktailGlass.find('span.sous-titre')).to.have.length(1);
    expect(divCocktailGlass.find('span.sous-titre').text()).to.be.equal('Verre à utiliser : ');
  })

  it('should contain a span witch className="glass" and text is "Verre à Cocktail : "', () => {
    expect(divCocktailGlass.find('span.glass')).to.have.length(1);
    expect(divCocktailGlass.find('span.glass').text()).to.be.equal('Verre à Cocktail');
  })

  const divCocktailSteps = divRecipePage.find('div.cocktail-steps');

  it('should contain a div witch className="cocktail-steps"', () => {
    expect(divCocktailSteps).to.have.length(1);
  })

  it('should contain a span witch className="sous-titre" and text is "Préparation : "', () => {
    expect(divCocktailSteps.find('span.sous-titre')).to.have.length(1);
    expect(divCocktailSteps.find('span.sous-titre').text()).to.be.equal('Préparation : ');
  })

  it('should contain an ul tag and 5 li tags witch className is "step"', () => {
    expect(divCocktailSteps.find('ul')).to.have.length(1);
    expect(divCocktailSteps.find('ul').find('li.step')).to.have.length(5);
  })
})
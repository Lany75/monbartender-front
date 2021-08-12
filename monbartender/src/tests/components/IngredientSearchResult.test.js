import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IngredientSearchResult from '../../components/ingredientSearchResult/IngredientSearchResult';
import CocktailsCard from '../../components/cocktailCard/CocktailCard';

const searchCocktails = [
  {
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
  },
  {
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
];

describe('<IngredientSearchResult />', () => {
  const ingredientSearchResult = shallow(<IngredientSearchResult cocktails={searchCocktails} />)
  const divSearchResult = ingredientSearchResult.find('div.search-result');

  it('should contain a div witch className is search-result', () => {
    expect(divSearchResult).to.have.length(1);
  })

  const pResultTitle = divSearchResult.find('p.result-title');

  it('should contain a p tag witch className is result-title and text is "2 resultat(s) pour votre recherche"', () => {
    expect(pResultTitle).to.have.length(1);
    expect(pResultTitle.text()).to.be.equal('2 resultat(s) pour votre recherche');
  })

  const divResultCocktails = divSearchResult.find('div.result-cocktails');

  it('should contain a div witch className is result-cocktails', () => {
    expect(divResultCocktails).to.have.length(1);
  })

  it('should contain 2 CocktailCard components', () => {
    expect(divResultCocktails.find(CocktailsCard)).to.have.length(2);;
  })
})
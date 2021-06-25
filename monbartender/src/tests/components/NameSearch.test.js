import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NameSearch from '../../components/nameSearch/NameSearch';
import NameSearchForm from '../../components/nameSearchForm/NameSearchForm';
import NameSearchResult from '../../components/nameSearchResult/NameSearchResult';

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

describe('<NameSearch />', () => {

  it('should contain only a NameSearchForm component if searchCocktails is falsy', () => {
    const cocktailNameMock = '';
    const searchCocktailsMock = undefined;

    React.useState = jest
      .fn()
      .mockReturnValueOnce([cocktailNameMock, {}])
      .mockReturnValueOnce([searchCocktailsMock, {}])

    const nameSearch = shallow(<NameSearch />);

    expect(nameSearch.find(NameSearchForm)).to.have.length(1);
    expect(nameSearch.find(NameSearchResult)).to.have.length(0);
  })

  it('should contain a NameSearchForm and a NameSearchResult component if searchCocktails is not falsy', () => {
    const cocktailNameMock = '';
    const searchCocktailsMock = cocktailTest;

    React.useState = jest
      .fn()
      .mockReturnValueOnce([cocktailNameMock, {}])
      .mockReturnValueOnce([searchCocktailsMock, {}])

    const nameSearch = shallow(<NameSearch />);

    expect(nameSearch.find(NameSearchForm)).to.have.length(1);
    expect(nameSearch.find(NameSearchResult)).to.have.length(1);
  })
})
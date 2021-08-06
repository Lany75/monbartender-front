import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import IngredientsOfCategory from '../../components/ingredientsOfCategory/IngredientsOfCategory';

const testListIngredients = [
  {
    id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
    nom: "Eau Gazeuse",
    CategorieIngredient: {
      id: "52285198-dd1c-44d7-98b1-df2ef326e564",
      nom: "SOFT"
    }
  },
  {
    id: "b233195d-a090-4b96-a76d-f016c842c472",
    nom: "Jus De Citron Jaune",
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "JUS"
    }
  },
  {
    id: "e624bd35-e414-4874-a406-14a7d9d24231",
    nom: "Jus De Tomate",
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "JUS"
    }
  },
  {
    id: "740367a4-dedf-4093-86d1-50eac62b2521",
    nom: "Menthe",
    CategorieIngredient:
    {
      id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
      nom: "AUTRE"
    }
  },
  {
    id: "bd799ef3-d7ae-4975-8be0-8f2397fa2b18",
    nom: "Rhum",
    CategorieIngredient:
    {
      id: "66ca7575-284f-41f9-b468-7535be3a3c18",
      nom: "ALCOOL"
    }
  }
];
const userBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: false,
  Ingredients: [
    {
      CategorieIngredient:
      {
        id: "52285198-dd1c-44d7-98b1-df2ef326e564",
        nom: "SOFT"
      },
      id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
      nom: "Eau Gazeuse"
    },
    {
      CategorieIngredient:
      {
        id: "57459a23-14dc-43e7-b730-932cee95b477",
        nom: "JUS"
      },
      id: "e624bd35-e414-4874-a406-14a7d9d24231",
      nom: "Jus De Tomate"
    },
    {
      CategorieIngredient:
      {
        id: "66ca7575-284f-41f9-b468-7535be3a3c18",
        nom: "ALCOOL"
      },
      id: "bd799ef3-d7ae-4975-8be0-8f2397fa2b18",
      nom: "Rhum"
    },
    {
      CategorieIngredient:
      {
        id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
        nom: "AUTRE"
      },
      id: "6793d13b-e38c-4183-825b-df2ca8957fca",
      nom: "Tabasco"
    }
  ],
};
const testCategory = {
  id: "57459a23-14dc-43e7-b730-932cee95b477",
  nom: "JUS"
};
const userBarJus = [{
  CategorieIngredient:
  {
    id: "57459a23-14dc-43e7-b730-932cee95b477",
    nom: "JUS"
  },
  id: "e624bd35-e414-4874-a406-14a7d9d24231",
  nom: "Jus De Tomate"
}];
const undefinedBarJus = [
  {
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "JUS"
    },
    id: "b233195d-a090-4b96-a76d-f016c842c472",
    nom: "Jus De Citron Jaune",
  },
  {
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "JUS"
    },
    id: "e624bd35-e414-4874-a406-14a7d9d24231",
    nom: "Jus De Tomate"
  },

];

describe('<IngredientsOfCategory />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  const realUseState = React.useState;

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeIngredients: testListIngredients,
    bar: userBar
  }));
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(userBarJus))
    .mockImplementationOnce(() => realUseState(true))

  const ingredientOfCategory1 = shallow(<IngredientsOfCategory category={testCategory} isOpenFilter={true} useMyIngredient={true} />);

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeIngredients: testListIngredients,
    bar: userBar
  }));
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(undefinedBarJus))
    .mockImplementationOnce(() => realUseState(true))

  const ingredientOfCategory2 = shallow(<IngredientsOfCategory category={testCategory} isOpenFilter={true} useMyIngredient={false} />);

  const filterItem1 = ingredientOfCategory1.find('div.filter-item');
  const filterItem2 = ingredientOfCategory2.find('div.filter-item');

  it('should contain a div witch className="filter-item"', () => {
    expect(filterItem1).to.have.length(1);
    expect(filterItem2).to.have.length(1);
  })

  it('should contain 1 FilterItem component if useMyIngredient=true', () => {
    expect(filterItem1.find('FilterItem')).to.have.length(1);
  })

  it('should contain 2 FilterItem components if useMyIngredient=false', () => {
    expect(filterItem2.find('FilterItem')).to.have.length(2);
  })
})
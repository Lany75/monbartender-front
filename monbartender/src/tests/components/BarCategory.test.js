import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BarCategory from '../../components/barCategory/BarCategory';

const userBar = {
  id: 'aabdd6c6-9209-4ff0-8c3b-fc3829444e20',
  personneId: 'mlanie.parry@gmail.com',
  droits: false,
  Ingredients: [
    {
      CategorieIngredient:
      {
        id: '52285198-dd1c-44d7-98b1-df2ef326e564',
        nom: 'SOFT'
      },
      id: 'ad1d8a81-7ae6-4f5e-83a3-64889d390f8a',
      nom: 'Eau Gazeuse'
    },
    {
      CategorieIngredient:
      {
        id: '57459a23-14dc-43e7-b730-932cee95b477',
        nom: 'JUS'
      },
      id: 'e624bd35-e414-4874-a406-14a7d9d24231',
      nom: 'Jus De Tomate'
    },
    {
      CategorieIngredient:
      {
        id: '66ca7575-284f-41f9-b468-7535be3a3c18',
        nom: 'ALCOOL'
      },
      id: 'bd799ef3-d7ae-4975-8be0-8f2397fa2b18',
      nom: 'Rhum'
    },
    {
      CategorieIngredient:
      {
        id: '52285198-dd1c-44d7-98b1-df2ef326e564',
        nom: 'SOFT'
      },
      id: '78eb7b16-02ea-4ed9-8d1d-cc8583f6704a',
      nom: 'Schweppes Tonic'
    },
    {
      CategorieIngredient:
      {
        id: 'f41e14e2-9bdd-47f4-95b4-1ff77022c630',
        nom: 'AUTRE'
      },
      id: '6793d13b-e38c-4183-825b-df2ca8957fca',
      nom: 'Tabasco'
    }
  ],
};
const ingredientsOfCategoryMock = [
  {
    CategorieIngredient:
    {
      id: '52285198-dd1c-44d7-98b1-df2ef326e564',
      nom: 'SOFT'
    },
    id: 'ad1d8a81-7ae6-4f5e-83a3-64889d390f8a',
    nom: 'Eau Gazeuse'
  },
  {
    CategorieIngredient:
    {
      id: '52285198-dd1c-44d7-98b1-df2ef326e564',
      nom: 'SOFT'
    },
    id: '78eb7b16-02ea-4ed9-8d1d-cc8583f6704a',
    nom: 'Schweppes Tonic'
  }
];
const testCategory = {
  id: '52285198-dd1c-44d7-98b1-df2ef326e564',
  nom: 'SOFT'
}

describe('<BarCategory />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  const realUseState = React.useState;

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    bar: userBar
  }));
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(ingredientsOfCategoryMock))

  const barCategory = shallow(<BarCategory category={testCategory} />);
  const divBarCategory = barCategory.find('div.bar-category');

  it('should contain a div witch className="bar-category"', () => {
    expect(divBarCategory).to.have.length(1);
  })

  it('should contain a p tag witch className="category-name" and text="SOFT"', () => {
    const categoryName = divBarCategory.find('p.category-name');
    expect(categoryName).to.have.length(1);
    expect(categoryName.text()).to.be.equal('SOFT');
  })

  const barIngredients = divBarCategory.find('div.bar-ingredients');

  it('should contain a div witch className="bar-ingredients"', () => {
    expect(barIngredients).to.have.length(1);
  })

  it('should contain 2 BarIngredient component', () => {
    expect(barIngredients.find('BarIngredient')).to.have.length(2);
  })
})
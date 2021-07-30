import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import IngredientsOfCategory from '../../components/ingredientsOfCategory/IngredientsOfCategory';

const testListIngredientsOfCategory = [
  {
    CategorieIngredient: {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "JUS"
    },
    id: "38925fb2-2267-47c7-b62e-e134e41a51c7",
    nom: "Jus De Citron Vert"
  },
  {
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "JUS"
    },
    id: "e624bd35-e414-4874-a406-14a7d9d24231",
    nom: "Jus De Tomate"
  }
];
const testCategory = {
  id: "57459a23-14dc-43e7-b730-932cee95b477",
  nom: "JUS"
}

describe('<IngredientsOfCategory />', () => {
  const realUseState = React.useState;
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(testListIngredientsOfCategory))
    .mockImplementationOnce(() => realUseState(true))

  const ingredientOfCategory = shallow(<IngredientsOfCategory category={testCategory} isOpenFilter={true} />);
  const filterItem = ingredientOfCategory.find('div.filter-item');

  it('should contain a div witch className="filter-item"', () => {
    expect(filterItem).to.have.length(1);
  })

  it('should contain 2 FilterItem components', () => {
    expect(filterItem.find('FilterItem')).to.have.length(2);
  })
})
import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { RadioGroup, FormControlLabel, Button } from "@material-ui/core";

import IngredientSearchForm from '../../components/ingredientSearchForm/IngredientSearchForm';

const testListCategoriesIngredients = [
  {
    id: "66ca7575-284f-41f9-b468-7535be3a3c18",
    nom: "alcool"
  },
  {
    id: "64ba9cda-82b4-403f-8018-c954d3326fd9",
    nom: "fruit"
  },
  {
    id: "57459a23-14dc-43e7-b730-932cee95b477",
    nom: "jus"
  },
  {
    id: "8e6d7f82-95f6-40d4-ac30-9462a157b66e",
    nom: "liqueur"
  },
  {
    id: "69ee0fd7-1489-4873-b036-dfeb9744d2e2",
    nom: "sirop"
  }
]

describe('<IngredientSearchForm />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeCategoriesIngredients: testListCategoriesIngredients,
  }));

  const ingredientSearchForm = shallow(<IngredientSearchForm />);
  const formIngredientSearch = ingredientSearchForm.find('form.ingredient-search-form');

  it('should contain a form witch className is ingredient-search-form', () => {
    expect(formIngredientSearch).to.have.length(1);
  })

  const typeMyIngr = formIngredientSearch.find('div.type-myingr');

  it('should contain a div witch className="type-myingr"', () => {
    expect(typeMyIngr).to.have.length(1);
  })

  const radioGroup = typeMyIngr.find(RadioGroup);

  it('should contain a RadioGroup component witch id="radio-button", have name, value and onChange attributes', () => {
    expect(radioGroup).to.have.length(1);
    expect(radioGroup.props()).to.have.property('id', 'radio-button');
    expect(radioGroup.props()).to.have.property('name', 'alcool');
    expect(radioGroup.props()).to.have.property('value');
    expect(typeof (radioGroup.props().onChange)).to.equal('function');
  })

  const formControl = typeMyIngr.find(FormControlLabel);

  it('should contain 4 FormControlLabel component', () => {
    expect(formControl).to.have.length(4);
  })

  const filters = formIngredientSearch.find('div.filters');

  it('should contain a div witch className="filters"', () => {
    expect(filters).to.have.length(1);
  })

  const titleRemove = filters.find('div.title-remove');

  it('should contain a div witch className="title-remove"', () => {
    expect(titleRemove).to.have.length(1);
  })

  it('should contain a h3 tag witch text="Les filtres"', () => {
    const h3Tag = titleRemove.find('h3');
    expect(h3Tag).to.have.length(1);
    expect(h3Tag.text()).to.be.equal('Les filtres');
  })

  it('should contain a p tag witch text="Supprimer les filtres"', () => {
    const pTag = titleRemove.find('p');
    expect(pTag).to.have.length(1);
    expect(pTag.text()).to.be.equal('Supprimer les filtres');
  })

  const filtersList = filters.find('div.filters-list');

  it('should contain a div witch className="filters-list"', () => {
    expect(filtersList).to.have.length(1);
  })

  it('should contain 5 IngredientSearchFilter components', () => {
    expect(filtersList.find('IngredientSearchFilter')).to.have.length(5);
  })

  const filtersItem = filters.find('div.filters-item');

  it('should contain a div witch className="filters-item"', () => {
    expect(filtersItem).to.have.length(1);
  })

  const ingredientSearchButton = formIngredientSearch.find('div.ingredient-search-button');

  it('should contain a div witch className="ingredient-search-button"', () => {
    expect(ingredientSearchButton).to.have.length(1);
  })

  it('should contain a submit Button with text="J\'ai soif !!"', () => {
    const button = ingredientSearchButton.find(Button);
    expect(button).to.have.length(1);
    expect(button.props()).to.have.property('type', 'submit');
    expect(button.text()).to.be.equal("J'ai soif !!");
  })
})
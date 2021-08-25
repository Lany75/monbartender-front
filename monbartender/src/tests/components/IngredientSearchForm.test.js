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

const userBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: false,
  Ingredients: [],
};

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
    bar: userBar
  }));

  const ingredientSearchForm1 = shallow(<IngredientSearchForm />);

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeCategoriesIngredients: testListCategoriesIngredients,
    bar: undefined
  }));

  const ingredientSearchForm2 = shallow(<IngredientSearchForm />);

  const formIngredientSearch1 = ingredientSearchForm1.find('form.ingredient-search-form');
  const formIngredientSearch2 = ingredientSearchForm2.find('form.ingredient-search-form');

  it('should contain a form witch className is ingredient-search-form', () => {
    expect(formIngredientSearch1).to.have.length(1);
    expect(formIngredientSearch2).to.have.length(1);
  })

  const typeMyIngr1 = formIngredientSearch1.find('div.type-myingr');
  const typeMyIngr2 = formIngredientSearch2.find('div.type-myingr');

  it('should contain a div witch className="type-myingr"', () => {
    expect(typeMyIngr1).to.have.length(1);
    expect(typeMyIngr2).to.have.length(1);
  })

  const radioGroup1 = typeMyIngr1.find(RadioGroup);
  const radioGroup2 = typeMyIngr2.find(RadioGroup);

  it('should contain a RadioGroup component witch id="radio-button", have name, value and onChange attributes', () => {
    expect(radioGroup1).to.have.length(1);
    expect(radioGroup1.props()).to.have.property('id', 'radio-button');
    expect(radioGroup1.props()).to.have.property('name', 'alcool');
    expect(radioGroup1.props()).to.have.property('value');
    expect(radioGroup1.props()).to.have.property('onChange');

    expect(radioGroup2).to.have.length(1);
    expect(radioGroup2.props()).to.have.property('id', 'radio-button');
    expect(radioGroup2.props()).to.have.property('name', 'alcool');
    expect(radioGroup2.props()).to.have.property('value');
    expect(radioGroup2.props()).to.have.property('onChange');
  })

  const formControl1 = typeMyIngr1.find(FormControlLabel);

  it('should contain 4 FormControlLabel component if bar is defined', () => {
    expect(formControl1).to.have.length(4);
  })

  const formControl2 = typeMyIngr2.find(FormControlLabel);

  it('should contain 3 FormControlLabel component if bar is undefined', () => {
    expect(formControl2).to.have.length(3);
  })

  const filters1 = formIngredientSearch1.find('div.filters');
  const filters2 = formIngredientSearch2.find('div.filters');

  it('should contain a div witch className="filters"', () => {
    expect(filters1).to.have.length(1);
    expect(filters2).to.have.length(1);
  })

  const titleRemove1 = filters1.find('div.title-remove');
  const titleRemove2 = filters2.find('div.title-remove');

  it('should contain a div witch className="title-remove"', () => {
    expect(titleRemove1).to.have.length(1);
    expect(titleRemove2).to.have.length(1);
  })

  it('should contain a h3 tag witch text="Les filtres"', () => {
    const h3Tag1 = titleRemove1.find('h3');
    expect(h3Tag1).to.have.length(1);
    expect(h3Tag1.text()).to.be.equal('Les filtres');

    const h3Tag2 = titleRemove2.find('h3');
    expect(h3Tag2).to.have.length(1);
    expect(h3Tag2.text()).to.be.equal('Les filtres');
  })

  it('should contain a p tag with text="Supprimer les filtres" and onClick attribute', () => {
    const pTag1 = titleRemove1.find('p');
    expect(pTag1).to.have.length(1);
    expect(pTag1.text()).to.be.equal('Supprimer les filtres');
    expect(pTag1.props()).to.have.property('onClick');

    const pTag2 = titleRemove2.find('p');
    expect(pTag2).to.have.length(1);
    expect(pTag2.text()).to.be.equal('Supprimer les filtres');
    expect(pTag2.props()).to.have.property('onClick');
  })

  const filtersList1 = filters1.find('div.filters-list');
  const filtersList2 = filters2.find('div.filters-list');

  it('should contain a div witch className="filters-list"', () => {
    expect(filtersList1).to.have.length(1);
    expect(filtersList2).to.have.length(1);
  })

  it('should contain 5 IngredientSearchFilter components', () => {
    expect(filtersList1.find('IngredientSearchFilter')).to.have.length(5);
    expect(filtersList2.find('IngredientSearchFilter')).to.have.length(5);
  })

  const filtersItem1 = filters1.find('div.filters-item');
  const filtersItem2 = filters2.find('div.filters-item');

  it('should contain a div witch className="filters-item"', () => {
    expect(filtersItem1).to.have.length(1);
    expect(filtersItem2).to.have.length(1);
  })

  const ingredientSearchButton1 = formIngredientSearch1.find('div.ingredient-search-button');
  const ingredientSearchButton2 = formIngredientSearch2.find('div.ingredient-search-button');

  it('should contain a div witch className="ingredient-search-button"', () => {
    expect(ingredientSearchButton1).to.have.length(1);
    expect(ingredientSearchButton2).to.have.length(1);
  })

  it('should contain a submit Button with text="J\'ai soif !!"', () => {
    const button1 = ingredientSearchButton1.find(Button);
    expect(button1).to.have.length(1);
    expect(button1.props()).to.have.property('type', 'submit');
    expect(button1.text()).to.be.equal("J'ai soif !!");

    const button2 = ingredientSearchButton2.find(Button);
    expect(button2).to.have.length(1);
    expect(button2.props()).to.have.property('type', 'submit');
    expect(button2.text()).to.be.equal("J'ai soif !!");
  })
})
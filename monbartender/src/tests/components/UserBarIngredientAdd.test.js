import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from '@material-ui/core';

import UserBarIngredientAdd from '../../components/userBarIngredientAdd/UserBarIngredientAdd';

const testListIngredients = [
  {
    id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
    nom: "Eau Gazeuse",
    CategorieIngredient: {
      id: "52285198-dd1c-44d7-98b1-df2ef326e564",
      nom: "soft"
    }
  },
  {
    id: "b233195d-a090-4b96-a76d-f016c842c472",
    nom: "Jus De Citron Jaune",
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "jus"
    }
  },
  {
    id: "740367a4-dedf-4093-86d1-50eac62b2521",
    nom: "Menthe",
    CategorieIngredient:
    {
      id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
      nom: "autre"
    }
  },
  {
    id: "bd799ef3-d7ae-4975-8be0-8f2397fa2b18",
    nom: "Rhum",
    CategorieIngredient:
    {
      id: "66ca7575-284f-41f9-b468-7535be3a3c18",
      nom: "alcool"
    }
  }
];

describe('<UserBarIngredientAdd />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  describe('it tests case if listeIngredients is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeIngredients: undefined,
    }));

    const userBarIngredientAdd = shallow(<UserBarIngredientAdd />);

    it('should contain a LoadingMessage component', () => {
      expect(userBarIngredientAdd.find('LoadingMessage')).to.have.length(1);
      expect(userBarIngredientAdd.find('form.bar-ingredient-add')).to.have.length(0);
    })
  })

  describe('it tests case if listeIngredients is defined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeIngredients: testListIngredients,
    }));

    const userBarIngredientAdd = shallow(<UserBarIngredientAdd />);
    const formIngredientAdd = userBarIngredientAdd.find('form.bar-ingredient-add');

    it('should contain a form witch className="ingredient-add"', () => {
      expect(userBarIngredientAdd.find('LoadingMessage')).to.have.length(0);
      expect(formIngredientAdd).to.have.length(1);
    })

    it('should contain an Autocomplete component with className, options, getOptionLabel and renderInput attributes', () => {
      const ingredientAddInput = formIngredientAdd.find(Autocomplete);

      expect(ingredientAddInput).to.have.length(1);
      expect(ingredientAddInput.props()).to.have.property('className', 'ingredient-add-input');
      expect(ingredientAddInput.props()).to.have.property('options');
      expect(ingredientAddInput.props()).to.have.property('getOptionLabel');
      expect(ingredientAddInput.props()).to.have.property('renderInput');
    })

    it('should contain a submit Button component with text "+"', () => {
      expect(formIngredientAdd.find(Button)).to.have.length(1);
      expect(formIngredientAdd.find(Button).props()).to.have.property('type', 'submit');
      expect(formIngredientAdd.find(Button).text()).to.be.equal('+');
    })
  })
})
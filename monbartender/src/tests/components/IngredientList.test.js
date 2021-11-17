import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";

import IngredientList from '../../components/ingredientList/IngredientList';
import DialogDeleteIngredient from '../../components/dialogDeleteIngredient/DialogDeleteIngredient';
import DialogModifyIngredient from '../../components/dialogModifyIngredient/DialogModifyIngredient';

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

describe('<IngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeIngredients: testListIngredients,
  }));

  const ingredientList = shallow(<IngredientList />);
  const divIngredientsList = ingredientList.find('div.ingredients-list');

  it('should contain a div with className="ingredients-list"', () => {
    expect(divIngredientsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = divIngredientsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const divDeleteIngredient = ingredientList.find('div.delete-ingredients');

  it('should contain a div with className="delete-ingredients"', () => {
    expect(divDeleteIngredient).to.have.length(1);
  })

  it('should contain a Button component with onClick attribute and text="Supprimer les ingrédients"', () => {
    const deleteButton = divDeleteIngredient.find(Button);

    expect(deleteButton).to.have.length(1);
    expect(deleteButton.props()).to.have.property('onClick');
    expect(deleteButton.text()).to.be.equal('Supprimer les ingrédients');
  })

  it('should contain a div with className="message"', () => {
    expect(divDeleteIngredient.find('div.message')).to.have.length(1);
  })

  it('should contain a DialogDeleteIngredient component', () => {
    expect(ingredientList.find(DialogDeleteIngredient)).to.have.length(1);
  })

  it('should contain a DialogModifyIngredient component', () => {
    expect(ingredientList.find(DialogModifyIngredient)).to.have.length(1);
  })
})
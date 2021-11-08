import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CocktailIngredients from '../../components/cocktailIngredients/CocktailIngredients';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

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

const unitiesListTest = [
  {
    id: "e62f73e2-fa06-4f66-bc5a-47e349e1a6cd",
    nom: "cl"
  },
  {
    id: "0a02c041-235d-4382-892d-72b87ea000fa",
    nom: "feuille(s)"
  },
  {
    id: "0fee5a7d-fe97-47f9-bb5d-b9ea5cebd665",
    nom: "goutte(s)"
  },
  {
    id: "70a07305-7a87-48c2-97d9-db69b2b53953",
    nom: "gr"
  },
  {
    id: "9e6559ce-197f-43b6-8cb6-2bbe7fc3df73",
    nom: "ml"
  }
]

describe('<CocktailIngredients />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeIngredients: testListIngredients,
    unitiesList: unitiesListTest,
  }));

  const cocktailIngredients = shallow(<CocktailIngredients />);
  const divCocktailIngredients = cocktailIngredients.find('div.cocktail-add-ingredients');

  it('should contain a div with className="cocktail-add-ingredients"', () => {
    expect(divCocktailIngredients).to.have.length(1);
  })

  const cocktailIngredientsList = divCocktailIngredients.find('div.cocktail-ingredients-list')

  it('should contain a div with className="cocktail-ingredients-list"', () => {
    expect(cocktailIngredientsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = cocktailIngredientsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const addDeleteIngredients = divCocktailIngredients.find('div.add-delete-ingredients')

  it('should contain a div with className="add-delete-ingredients"', () => {
    expect(addDeleteIngredients).to.have.length(1);
  })

  const buttons = addDeleteIngredients.find(Button);

  it('should contain 2 Button components with onClick attribute', () => {
    expect(buttons).to.have.length(2);
    buttons.map(button => {
      expect(button.props()).to.have.property('onClick');
    })
  })

  it('first button should contain text="Ajouter un ingrédient"', () => {
    expect(buttons.first().text()).to.be.equal('Ajouter un ingrédient');
  })

  it('second button should contain text="Supprimer les ingrédients"', () => {
    expect(buttons.last().text()).to.be.equal('Supprimer les ingrédients');
  })

  /*it('should contain a div with className="message"', () => {
    expect(addDeleteIngredients.find('div.message')).to.have.length(1);
  })*/

  const dialogs = divCocktailIngredients.find(Dialog);

  it('should contain 2 Dialog components with open and onClose attributes', () => {
    expect(dialogs).to.have.length(2);
    dialogs.forEach(d => {
      expect(d.props()).to.have.property('open');
      expect(d.props()).to.have.property('onClose');
    })
  })

  describe('first Dialog component (add new ingredient dialog)', () => {
    const addNewIngredientDialog = dialogs.first();
    const dialogTitle = addNewIngredientDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="form-dialog-title" and text="Ajout d\'ingrédient"', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Ajout d\'ingrédient');
    })

    const dialogContent = addNewIngredientDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    it('should contain a DialogContentText component with text="Choisissez l\'ingrédient à ajouter"', () => {
      expect(dialogContent.find(DialogContentText)).to.have.length(1);
      expect(dialogContent.find(DialogContentText).text()).to.be.equal('Choisissez l\'ingrédient à ajouter');
    })

    const dataNewIngredient = dialogContent.find('div.data-new-ingredient');

    it('should contain a div with className="data-new-ingredient"', () => {
      expect(dataNewIngredient).to.have.length(1);
    })

    const ingredientName = dataNewIngredient.find('div.ingredient-name');

    it('should contain a div with className="ingredient-name"', () => {
      expect(ingredientName).to.have.length(1);
    })

    const formControlIngredient = ingredientName.find(FormControl);

    it('should contain a FormControl component', () => {
      expect(formControlIngredient).to.have.length(1);
    })

    it('should contain an InputLabel component with id="label-ingredient" and text="Ingrédient"', () => {
      const inputLabel = formControlIngredient.find(InputLabel);
      expect(inputLabel).to.have.length(1);
      expect(inputLabel.props()).to.have.property('id', 'label-ingredient');
      expect(inputLabel.text()).to.be.equal('Ingrédient');
    })

    const selectIngredient = formControlIngredient.find(Select);

    it('should contain a Select component with className="form-control-select", label="Ingredient" and onChange attribute', () => {
      expect(selectIngredient).to.have.length(1);
      expect(selectIngredient.props()).to.have.property('className', 'form-control-select');
      expect(selectIngredient.props()).to.have.property('label', 'Ingredient');
      expect(selectIngredient.props()).to.have.property('onChange');
    })

    const menuItemIngredient = selectIngredient.find(MenuItem);

    it('should contain 4 MenuItem components', () => {
      expect(menuItemIngredient).to.have.length(4);
    })

    it('should contain a TextField component with label, value and onChange attribute', () => {
      const textField = dataNewIngredient.find(TextField);

      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'quantité');
      expect(textField.props()).to.have.property('value');
      expect(textField.props()).to.have.property('onChange');
    })

    const quantityUnity = dataNewIngredient.find('div.quantity-unity');

    it('should contain a div with className="quantity-unity"', () => {
      expect(quantityUnity).to.have.length(1);
    })

    const formControlUnity = quantityUnity.find(FormControl);

    it('should contain a FormControl component', () => {
      expect(formControlUnity).to.have.length(1);
    })

    it('should contain an InputLabel component with id="label-unity" and text="Unité"', () => {
      const inputLabel = formControlUnity.find(InputLabel);
      expect(inputLabel).to.have.length(1);
      expect(inputLabel.props()).to.have.property('id', 'label-unity');
      expect(inputLabel.text()).to.be.equal('Unité');
    })

    const selectUnity = formControlUnity.find(Select);

    it('should contain a Select component with className="form-control-select", label="Unité" and onChange attribute', () => {
      expect(selectUnity).to.have.length(1);
      expect(selectUnity.props()).to.have.property('className', 'form-control-select');
      expect(selectUnity.props()).to.have.property('label', 'Unité');
      expect(selectUnity.props()).to.have.property('onChange');
    })

    const menuItemUnity = selectUnity.find(MenuItem);

    it('should contain 5 MenuItem components', () => {
      expect(menuItemUnity).to.have.length(5);
    })

    const dialogActions = addNewIngredientDialog.find(DialogActions);

    it('should contain a DialogActions component', () => {
      expect(dialogActions).to.have.length(1);
    })

    it('should contain 2 Button components with onClick attribute', () => {
      const dialogAtionsButton = dialogActions.find(Button);
      expect(dialogAtionsButton).to.have.length(2);
      dialogAtionsButton.map(dab => {
        expect(dab.props()).to.have.property('onClick');
      })
    })
  })

  describe('second Dialog component (ingredient quantity dialog)', () => {
    const ingredientQuantityDialog = dialogs.last();
    const dialogTitle = ingredientQuantityDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="form-dialog-title" and text="Modification de la quantité"', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Modification de la quantité');
    })

    const dialogContent = ingredientQuantityDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    it('should contain a DialogContentText component with text="Modifier la quantité pour l\'ingrédient "', () => {
      expect(dialogContent.find(DialogContentText)).to.have.length(1);
      expect(dialogContent.find(DialogContentText).text()).to.be.equal('Modifier la quantité pour l\'ingrédient ');
    })

    const dataNewIngredient = dialogContent.find('div.data-new-ingredient');

    it('should contain a div with className="data-new-ingredient"', () => {
      expect(dataNewIngredient).to.have.length(1);
    })

    it('should contain a TextField component with label, value and onChange attribute', () => {
      const textField = dataNewIngredient.find(TextField);

      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'quantité');
      expect(textField.props()).to.have.property('value');
      expect(textField.props()).to.have.property('onChange');
    })

    const quantityUnity = dataNewIngredient.find('div.quantity-unity');

    it('should contain a div with className="quantity-unity"', () => {
      expect(quantityUnity).to.have.length(1);
    })

    const formControlUnity = quantityUnity.find(FormControl);

    it('should contain a FormControl component', () => {
      expect(formControlUnity).to.have.length(1);
    })

    it('should contain an InputLabel component with id="label-unity" and text="Unité"', () => {
      const inputLabel = formControlUnity.find(InputLabel);
      expect(inputLabel).to.have.length(1);
      expect(inputLabel.props()).to.have.property('id', 'label-unity');
      expect(inputLabel.text()).to.be.equal('Unité');
    })

    const selectUnity = formControlUnity.find(Select);

    it('should contain a Select component with className="form-control-select", label="Unité" and onChange attribute', () => {
      expect(selectUnity).to.have.length(1);
      expect(selectUnity.props()).to.have.property('className', 'form-control-select');
      expect(selectUnity.props()).to.have.property('label', 'Unité');
      expect(selectUnity.props()).to.have.property('onChange');
    })

    const menuItemUnity = selectUnity.find(MenuItem);

    it('should contain 5 MenuItem components', () => {
      expect(menuItemUnity).to.have.length(5);
    })

    const dialogActions = ingredientQuantityDialog.find(DialogActions);

    it('should contain a DialogActions component', () => {
      expect(dialogActions).to.have.length(1);
    })

    it('should contain 2 Button components with onClick attribute', () => {
      const dialogAtionsButton = dialogActions.find(Button);
      expect(dialogAtionsButton).to.have.length(2);
      dialogAtionsButton.map(dab => {
        expect(dab.props()).to.have.property('onClick');
      })
    })
  })
})
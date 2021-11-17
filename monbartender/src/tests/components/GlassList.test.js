import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";

import GlassList from '../../components/glassList/GlassList';
import DialogErrorMessage from '../../components/dialogErrorMessage/DialogErrorMessage';
import DialogDeleteGlass from '../../components/dialogDeleteGlass/DialogDeleteGlass';
import DialogModifyGlass from '../../components/dialogModifyGlass/DialogModifyGlass';
import DialogAddNewGlass from '../../components/dialogAddNewGlass/DialogAddNewGlass';

const testListVerres = [
  {
    id: "351efe5d-c697-4e1a-a47c-ad555a800ed3",
    nom: "Chope"
  },
  {
    id: "aac971dd-7329-4579-88e7-8ca7a7c0b026",
    nom: "Flute"
  },
  {
    id: "0ec43307-8523-48c6-8fd9-06be72e484bd",
    nom: "Tumbler"
  },
  {
    id: "c69758d1-b4ad-4038-b157-205fd12d9ace",
    nom: "Verre à Cocktail"
  }
];

describe('<GlassList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeVerres: testListVerres,
  }));

  const glassList = shallow(<GlassList />);
  const divGlassesList = glassList.find('div.glasses-list');

  it('should contain a div with className="glasses-list"', () => {
    expect(divGlassesList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = divGlassesList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const divDeleteGlass = glassList.find('div.delete-glass');

  it('should contain a div with className="delete-glass"', () => {
    expect(divDeleteGlass).to.have.length(1);
  })

  it('should contain 2 Button components with onClick attribute', () => {
    const deleteButtons = divDeleteGlass.find(Button);

    expect(deleteButtons).to.have.length(2);
    deleteButtons.map(db => {
      expect(db.props()).to.have.property('onClick');
    })
  })

  it('should contain a DialogModifyGlass component', () => {
    expect(glassList.find(DialogModifyGlass)).to.have.length(1);
  })

  it('should contain a DialogDeleteGlass component', () => {
    expect(glassList.find(DialogDeleteGlass)).to.have.length(1);
  })

  it('should contain a DialogAddNewGlass component', () => {
    expect(glassList.find(DialogAddNewGlass)).to.have.length(1);
  })

  it('should contain a DialogErrorMessage component', () => {
    expect(glassList.find(DialogErrorMessage)).to.have.length(1);
  })
})
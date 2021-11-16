import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { FormControl, InputLabel, MenuItem, Select, } from "@material-ui/core";
import CocktailGlass from '../../components/cocktailGlass/CocktailGlass';

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

describe('<CocktailGlass />', () => {
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

  const cocktailGlass = shallow(<CocktailGlass />);
  const formControl = cocktailGlass.find(FormControl);

  it('should contain a FormControl component', () => {
    expect(formControl).to.have.length(1);
  })

  it('should contain an InputLabel component with id="label-glass" and text="Verre"', () => {
    const inputLabel = formControl.find(InputLabel);
    expect(inputLabel).to.have.length(1);
    expect(inputLabel.props()).to.have.property('id', 'label-glass');
    expect(inputLabel.text()).to.be.equal('Verre');
  })

  const selectFormControl = formControl.find(Select);

  it('should contain a Select component with id="select-glass"', () => {
    expect(selectFormControl).to.have.length(1);
    expect(selectFormControl.props()).to.have.property('id', 'select-glass');
  })

  it('should contain 4 MenuItem component', () => {
    expect(selectFormControl.find(MenuItem)).to.have.length(4);
  })
})

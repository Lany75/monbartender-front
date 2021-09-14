import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';

import UnityList from '../../components/unityList/UnityList';

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
  }
]

describe('<UnityList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    //accessToken: testAccessToken,
    unitiesList: unitiesListTest,
  }));

  const unityList = shallow(<UnityList />);

  it('should contain a h4 tag with text="LES UNITES"', () => {
    expect(unityList.find('h4')).to.have.length(1);
    expect(unityList.find('h4').text()).to.be.equal('LES UNITES');
  })

  const divUnitiesList = unityList.find('div.unities-list');

  it('should contain a div with className="unities-list"', () => {
    expect(divUnitiesList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = divUnitiesList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })
})
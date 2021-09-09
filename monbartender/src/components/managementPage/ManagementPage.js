import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

import TabPanel from '../tabPanel/TabPanel';
import ManageIngredients from '../manageIngredients/ManageIngredients';
import ManageCategories from '../manageCategories/ManageCategories';
import GestionCocktailMoment from "../gestionCocktailMoment/GestionCocktailMoment";
//import GestionCocktails from "../gestionCocktails/GestionCocktails";
import UnauthorizedPage from '../unauthorizedPage/UnauthorizedPage';
import ManageGlass from '../manageGlass/ManageGlass';
import ManageUsers from '../manageUsers/ManageUsers';
import ManageCocktails from '../manageCocktails/ManageCocktails';
import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';
import './ManagementPage.css';
import ManageUsers from '../manageUsers/ManageUsers';
import ManageUnities from '../manageUnities/ManageUnities';

const ManagementPage = () => {
  const { user } = React.useContext(AuthContext);
  const { bar } = React.useContext(BarContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div className='management-title'>Gestion ...</div>
          <Paper className='paper'>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Des Cocktails du Moment" id='management-tab-label' />
              <Tab label="Des Cocktails" id='management-tab-label' />
              <Tab label="Des Ingrédients" id='management-tab-label' />
              <Tab label="Des Verres" id='management-tab-label' />
              <Tab label="Des Utilisateurs" id='management-tab-label' />
            </Tabs>
          </Paper>

          <TabPanel id='tp-manage-moment-cocktails' value={value} index={0}>
            <GestionCocktailMoment />
          </TabPanel>
          <TabPanel id='tp-manage-cocktails' value={value} index={1}>
            <ManageCocktails />
            {/* <GestionCocktails />*/}
          </TabPanel>
          <TabPanel id='tp-manage-ingredients' value={value} index={2}>
            <ManageIngredients />
            <ManageCategories />
            <ManageUnities />
          </TabPanel>
          <TabPanel id='tp-manage-glasses' value={value} index={3}>
            <ManageGlass />
          </TabPanel>
          <TabPanel id='tp-manage-user' value={value} index={4}>
            <ManageUsers />
          </TabPanel>
        </>
      ) : (
        <UnauthorizedPage />
      )}
    </>
  )
}

export default ManagementPage;
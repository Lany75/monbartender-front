import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ManagementTabPanel from '../managementTabPanel/ManagementTabPanel';
import GestionCocktailMoment from "../gestionCocktailMoment/GestionCocktailMoment";
import GestionCocktails from "../gestionCocktails/GestionCocktails";
import GestionIngredients from "../gestionIngredients/GestionIngredients";
import GestionVerres from "../gestionVerres/GestionVerres";

import './ManagementPage.css';

const ManagementPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
          <Tab label="Des Admin" id='management-tab-label' />
        </Tabs>
      </Paper>

      <ManagementTabPanel value={value} index={0}>
        <GestionCocktailMoment />
      </ManagementTabPanel>
      <ManagementTabPanel value={value} index={1}>
        <GestionCocktails />
      </ManagementTabPanel>
      <ManagementTabPanel value={value} index={2}>
        <GestionIngredients />
      </ManagementTabPanel>
      <ManagementTabPanel value={value} index={3}>
        <GestionVerres />
      </ManagementTabPanel>
      <ManagementTabPanel value={value} index={4}>
        Item 5
      </ManagementTabPanel>
    </>
  )
}

export default ManagementPage;
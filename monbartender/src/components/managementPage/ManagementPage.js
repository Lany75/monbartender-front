import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';


import TabPanel from '../tabPanel/TabPanel';
import ManageIngredients from '../manageIngredients/ManageIngredients';
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

      <TabPanel value={value} index={0}>
        <GestionCocktailMoment />

      </TabPanel>
      <TabPanel value={value} index={1}>
        <GestionCocktails />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ManageIngredients />
        {/*<GestionIngredients />*/}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <GestionVerres />
      </TabPanel>
      <TabPanel value={value} index={4}>
        GestionAdmin
      </TabPanel>
    </>
  )
}

export default ManagementPage;
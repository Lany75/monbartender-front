import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

import TabPanel from '../tabPanel/TabPanel';
import RechercheParIngredient from '../rechercheParIngredient/RechercheParIngredient';
import NameSearch from '../nameSearch/NameSearch';
import RandomCocktail from '../randomCocktail/RandomCocktail';

import './SearchPage.css';
import './SearchPageDesktop.css';

const SearchPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='search-title'>Recherche ...</div>
      <Paper className='paper'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Par ingrédient" id='search-tab-label' />
          <Tab label="Par nom" id='search-tab-label' />
          <Tab label="Cocktail aléatoire" id='search-tab-label' />
        </Tabs>
      </Paper>

      <TabPanel id='tp-ingredient-search' value={value} index={0}>
        <RechercheParIngredient />
      </TabPanel>
      <TabPanel id='tp-name-search' value={value} index={1}>
        <NameSearch />
      </TabPanel>
      <TabPanel id='tp-random-cocktail' value={value} index={2}>
        <RandomCocktail />
      </TabPanel>
    </>
  )
}

export default SearchPage;
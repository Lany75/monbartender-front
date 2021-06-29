import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

import SearchTabPanel from '../searchTabPanel/SearchTabPanel';
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
      <SearchTabPanel value={value} index={0}>
        <RechercheParIngredient />
      </SearchTabPanel>
      <SearchTabPanel value={value} index={1}>
        <NameSearch />
      </SearchTabPanel>
      <SearchTabPanel value={value} index={2}>
        <RandomCocktail />
      </SearchTabPanel>
    </>
  )
}

export default SearchPage;
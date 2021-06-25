import React from 'react';

import NameSearchForm from '../nameSearchForm/NameSearchForm';
import NameSearchResult from '../nameSearchResult/NameSearchResult';

const NameSearch = () => {
  const [cocktailName, setCocktailName] = React.useState('');
  const [searchCocktails, setSearchCocktails] = React.useState();

  return (
    <>
      <NameSearchForm setCocktailName={setCocktailName} setSearchCocktails={setSearchCocktails} />
      {searchCocktails && <NameSearchResult cocktailName={cocktailName} cocktails={searchCocktails} />}
    </>
  )
}

export default NameSearch;
import React, { useState } from 'react';

import NameSearchForm from '../nameSearchForm/NameSearchForm';
import NameSearchResult from '../nameSearchResult/NameSearchResult';

const NameSearch = () => {
  const [cocktailName, setCocktailName] = useState('');
  const [searchCocktails, setSearchCocktails] = useState();

  return (
    <>
      <NameSearchForm setCocktailName={setCocktailName} setSearchCocktails={setSearchCocktails} />
      {searchCocktails && <NameSearchResult cocktailName={cocktailName} cocktails={searchCocktails} />}
    </>
  )
}

export default NameSearch;
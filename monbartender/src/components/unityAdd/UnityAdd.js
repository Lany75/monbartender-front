import React from 'react';
import { TextField, Button } from '@material-ui/core';

import './UnityAdd.css';
import { IngredientContext } from '../../context/ingredientContext';

const UnityAdd = () => {
  const { unitiesList } = React.useContext(IngredientContext);
  const [unityName, setUnityName] = React.useState('');

  console.log(unitiesList);

  const addUnity = event => {
    event.preventDefault();
    const name = unityName.replace(/\s+/g, ' ').trim();
  }
  return (
    <form className='form-unity-add' onSubmit={addUnity}>
      <div id='unity-add-name'>
        <TextField
          variant='outlined'
          margin='normal'
          label='Nouvelle unité'
          name='unityName'
          value={unityName}
          onChange={event => setUnityName(event.target.value)}
          required
        />
      </div>
      <div id='unity-add-btn'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          +
        </Button>
      </div>
    </form>
  )
}

export default UnityAdd;
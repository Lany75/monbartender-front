import React from 'react';
import Axios from "axios";

import apiBaseURL from "../../env";
import { AuthContext } from '../../context/authContext';
import UsersList from '../usersList/UsersList';

const ManageUsers = () => {
  const { accessToken } = React.useContext(AuthContext);
  const [usersList, setUsersList] = React.useState();

  const getUsersList = () => {
    Axios.get(`${apiBaseURL}/api/v2/bars/`, {
      headers: {
        authorization: accessToken
      }
    })
      .then(reponse => {
        setUsersList(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  React.useEffect(() => {
    getUsersList();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='manage-users'>
      <h4>LES UTILISATEURS</h4>
      <UsersList users={usersList} setUsers={setUsersList} />
    </div>
  )
}

export default ManageUsers;
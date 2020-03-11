import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import BarComponent from "../barComponent/BarComponent";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

// const controller = new AbortController();
// const signal = controller.signal;

const ListeBarComponent = () => {
  const { user, accessToken } = useContext(AuthContext);
  const [bar, setBar] = useState();
  let history = useHistory();
  //console.log("accessToken : ", accessToken);

  const getBarUser = () => {
    user &&
      accessToken &&
      fetch(`${apiBaseURL}/api/bars/`, {
        // signal,
        method: "GET",
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          //console.log("data : ", data);
          setBar(data);
          //history.push("/monbar");
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  console.log("bar : ", bar);

  React.useEffect(() => {
    history.push("/monbar");
  }, [bar]);

  React.useEffect(() => {
    getBarUser();
    // controller.abort();
  }, [user, accessToken]);

  return (
    <>
      {!bar ? (
        <div>Chargement du bar ...</div>
      ) : bar.Ingredients.length === 0 ? (
        <div>Votre bar est vide</div>
      ) : (
        bar.Ingredients.map((b, index) => {
          return (
            <div key={index} className="bar-component">
              <BarComponent nom={b.nom} />
            </div>
          );
        })
      )}
    </>
  );
};

export default ListeBarComponent;

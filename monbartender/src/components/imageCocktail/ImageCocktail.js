import React, { useState } from "react";
import { firebase } from "../../firebaseConfig";

import "./ImageCocktail.css";
import "./ImageCocktailDesktop.css";

const ImageCocktail = props => {
  const [imgUrl, setImgUrl] = useState();
  // eslint-disable-next-line react/prop-types
  const { classe, reference, nom } = props;

  const getImageFirebase = async reference => {
    const imgRef = firebase.storage().ref(reference);
    await imgRef.getDownloadURL().then(url => {
      setImgUrl(url);
    });
  };

  React.useEffect(() => {
    getImageFirebase(reference);
  }, [reference]);

  return <img className={classe} src={imgUrl} alt={nom} />;
};
export default ImageCocktail;

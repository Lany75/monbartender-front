import React, { useState } from "react";
import { refStorage } from "../../firebaseConfig";

import "./ImageCocktail.css";

const ImageCocktail = ({ classe, reference, nom }) => {
  const [imgUrl, setImgUrl] = useState();

  const getImageFirebase = reference => {
    const imgRef = refStorage.child(reference);
    imgRef.getDownloadURL().then(url => {
      setImgUrl(url);
    });
  };

  React.useEffect(() => {
    getImageFirebase(reference);
  }, [reference]);

  return <img className={classe} src={imgUrl} alt={nom} />;
};
export default ImageCocktail;

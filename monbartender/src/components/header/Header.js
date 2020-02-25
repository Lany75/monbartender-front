import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="iconMenu">
        <GiHamburgerMenu size={48} />
      </div>
      <div className="titre">Mon BarTender</div>
      <div className="iconLogin">
        <FaUserAlt size={44} />
      </div>
    </div>
  );
};

export default Header;

/*import { FaBeer } from 'react-icons/fa';

class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
*/

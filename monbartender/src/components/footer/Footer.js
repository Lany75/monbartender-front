import React from "react";

import "./Footer.css";
import "./FooterDesktop.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <div id="message-abus">
        L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec
        modération
      </div>
      <div id="c-ml">
        <a href="mailto:mlanie.parry@gmail.com">Contact</a>
        <Link to="/mentions-legales">
          <div>Mentions légales</div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;

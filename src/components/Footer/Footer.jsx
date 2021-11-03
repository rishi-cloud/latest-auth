import React from "react";
import "./Footer.css";
import translate from "../../localization/translate";
const Footer = () => {
  return (
    <div className="Footer-Container">
      <div className="Footer-LeftWrapper">
        <div className="Footer-Link-Container ">{translate("contactUs")}</div>
        <div className="Footer-Link-Container ">
          {" "}
          {translate("privacyNotice")}
        </div>
        <div className="Footer-Link-Container ">FAQs </div>
      </div>
      <div className="Footer-RightWrapper">
        <div> Copyright &copy;{new Date().getFullYear()} McAfee , LLC</div>
      </div>
    </div>
  );
};
export default Footer;

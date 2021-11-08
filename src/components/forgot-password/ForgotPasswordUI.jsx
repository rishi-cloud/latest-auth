import React from "react";
import translate from "../../localization/translate";
import { AiOutlineMail } from "react-icons/ai";
import "./style.css";
function ForgotPasswordUI(props) {
  const { emailDetails, handleEmailChange, handleEmailMe, setWhichPage } =
    props;
  return (
    <div className="ForgotPasswordContainer">
      <div className="ForgotPasswordLeftWrapper">
        <div className="LoginWelcomeContainer">
          <img
            alt="McAfeeLogo"
            className="McAfeeLogo"
            src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
          />
          <div className="ForgotPasswordIntro">Let's reset your password</div>
          <div className="ForgotPasswordIntroSubHeading">
            Enter the email you used to create your McAfee account and we’ll
            send you a link to reset your password.
          </div>
        </div>
      </div>
      <div className="ForgotPasswordRightWrapper">
        <div className="LoginInputContainer">
          {emailDetails.email !== "" ? (
            <div className="LoginInputLabel">{translate("email")}</div>
          ) : null}
          <div
            style={{
              flex: 1,
              display: "flex",
              border:
                emailDetails.emailError !== ""
                  ? "2px solid red"
                  : emailDetails.emailError === ""
                  ? "2px solid green"
                  : "",
              backgroundColor: "#ffff",
              borderRadius: "1rem",
            }}
          >
            <AiOutlineMail className="LoginInputLogo" />
            <input
              type="email"
              id="email"
              name="email"
              value={emailDetails.email}
              placeholder="Email"
              className="LoginInput"
              onChange={handleEmailChange}
            />
          </div>
        </div>
        {emailDetails.emailError !== "" && (
          <div className="Error">{emailDetails.emailError}</div>
        )}
        <div className="emailMeBtnWrapper">
          <button onClick={handleEmailMe} className="emailMeBtn">
            Email me
          </button>
        </div>
        <div className="contactSupportWrapper">
          <p className="contactSupportText">Forgot which email you used?</p>
          <button className="contactSupportBtn">Contact Support</button>
        </div>
        <hr className="dottedLine" />
        <div className="signInBtnWrapper">
          <button
            className="signInBtn"
            onClick={() => {
              setWhichPage("login-page");
            }}
          >
            Go back to sign in
          </button>
        </div>
        {emailDetails.databaseMessage !== "" && (
          <div className="Error">{emailDetails.databaseMessage}</div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordUI;

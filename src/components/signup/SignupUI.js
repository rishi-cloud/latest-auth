import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import { CommonDataContext } from "../../providers/CommonDataContext";
import Signup from "./Signup";
import "./style.css";
import translate from "../../localization/translate";
import CircularLoader from "../../loader/CircularLoader";
import { ReactComponent as McAfeeLogo } from "../../svg/Mcafee-Logo.svg";
import { FormattedMessage } from "react-intl";
import { Auth0Client } from "@auth0/auth0-spa-js";

const SignupUI = (props) => {
  const {
    onSubmit,
    SignupForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    SignupError,
    loader,
    setLoginForm,
    LoginForm,
    changePage,
    showSignupForm,
  } = props;
  const { setWhichPage } = useContext(AppContext);
  const { SignupText } = useContext(CommonDataContext);
  return (
    <>
      {loader ? (
        <div className="loaderWrapper">
          <div className="loaderLogo">
            <McAfeeLogo className="Logo" />
          </div>
          <div className="loader-creating-your-account">
            <img
              alt="McAfeeLogo"
              className="loading-logo"
              src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png"
            />
            <div className="loading-text">
              {translate("Creating_your_account")}
            </div>
            <CircularLoader />
          </div>
        </div>
      ) : (
        <>
          <div className="SignupWrapper">
            <div className="leftContainer">
              <McAfeeLogo className="Logo" />
              <div className="Intro">{translate(SignupText.title)}</div>
              {showSignupForm ? (
                <div className="IntroSubHeading">
                  <div className="Points">{translate(SignupText.subtitle)}</div>
                </div>
              ) : (
                <>
                  <div className="IntroSubHeadingWithError">
                    <div className="ErrorPoints">
                      <FormattedMessage
                        id={SignupText.subtitle}
                        defaultMessage="We can’t create an account for <b>{email}</b> because your email is from a country subject to US export restrictions, or your company is on a list of prohibited organizations, either by the US or foreign government agency."
                        values={{
                          b: (chunks) => (
                            <strong className="important">{chunks}</strong>
                          ),
                          email: `${SignupForm.email}`,
                        }}
                      />
                    </div>
                    <div className="Points">
                      <FormattedMessage
                        id="Email_us_at"
                        defaultMessage="Email us at <b>export@mcafee.com</b> if you have any questions."
                        values={{
                          b: (chunks) => <p className="bold-id">{chunks}</p>,
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="HorizontalSignup-dashedline"></div>
              {showSignupForm ? (
                <div className="BottomHeadingSignUp">
                  {translate("Already_have_a_account")}
                  <p className="Signup-page-link" onClick={() => changePage()}>
                    {translate("Sign_in_now")}
                  </p>
                </div>
              ) : (
                <div className="Signup-page-link" onClick={() => changePage()}>
                  {translate("Sign_in_with_a_different_email_address")}
                </div>
              )}
            </div>
            <div className="RightContainerSignup">
              {showSignupForm ? (
                <Signup
                  onChange={onChange}
                  onSubmit={onSubmit}
                  SignupForm={SignupForm}
                  onClick={onClick}
                  passwordRules={passwordRules}
                  PasswordPolicyState={PasswordPolicyState}
                  isValid={isValid}
                  SignupError={SignupError}
                ></Signup>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignupUI;

import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import { CommonDataContext } from "../../providers/CommonDataContext";
import "./style.css";
import Login from "./Login";
import translate from "../../localization/translate";
import CircularLoader from "../../loader/CircularLoader";
import { ReactComponent as McAfeeLogo } from "../../svg/Mcafee-Logo.svg";
import Timer from "../Timer/index";
import PasswordBlockScreen from "./view/PasswordBlockScreen";
import OtpBlockScreen from "./view/OtpBlockScreen";
import { FormattedMessage } from "react-intl";

const LoginUI = (props) => {
  const {
    onChange,
    switchLogin,
    onToggle,
    onSubmit,
    LoginError,
    LoginForm,
    validateEmail,
    Continue,
    onPressContinue,
    getOtp,
    socialBtn,
    hideEmail,
    loader,
    otpTimer,
    otpValid,
    setOtpValid,
    TimerState,
    setTimer,
    changePage,
    handleForgotPasswordClick,
    blockScreenToggle,
  } = props;
  const { LoginText, utagData } = useContext(CommonDataContext);

  const trackClickEvent = (navElement) => {
    let utag = window.utag;
    let updatedUtagData = { ...utagData };
    updatedUtagData["tm_global_tealium_calltype"] = "manual";
    updatedUtagData["tm_global_navigation_element"] = navElement;
    updatedUtagData["tm_global_navigation_element_click"] = "true";
    utag?.link(updatedUtagData);
  };
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
            <div className="loading-text">{translate("Signing_you_in")}...</div>
            <CircularLoader />
          </div>
        </div>
      ) : (
        <>
          <div className="LoginContainer">
            <div className="LoginLeftWrapper">
              <div className="LoginWelcomeContainer">
                <McAfeeLogo className="Logo" />
                <div className="LoginIntro">{translate(LoginText.title)}</div>
                <div
                  className="LoginIntroSubHeading"
                  style={{
                    display:
                      LoginError.errorCode === "user_blocked"
                        ? "none"
                        : "block",
                  }}
                >
                  <p>
                    <FormattedMessage
                      id={LoginText.subtitle}
                      defaultMessage="We sent a one-time passcode to <b>{email}</b>"
                      values={{
                        b: (chunks) => <strong>{chunks}</strong>,
                        email: `${LoginForm.email}`,
                      }}
                    >
                      {(chunks) => <p>{chunks}</p>}
                    </FormattedMessage>
                  </p>
                </div>
                {otpTimer && !LoginError.errorCode ? (
                  <Timer
                    initialMinute={3}
                    setOtpValid={setOtpValid}
                    setTimer={setTimer}
                    TimerState={TimerState}
                    getOtp={getOtp}
                  />
                ) : null}
                {LoginError.errorCode && (
                  <div className="ErrorDiv">
                    <p>
                      <FormattedMessage
                        id={LoginError.errorCode}
                        defaultMessage="We couldn’t sign you with this email and password. Try again, <b>reset your password</b>, or <b>sign in with a one-time passcode</b>."
                        values={{
                          b: (chunks) => (
                            <strong
                              className="important"
                              style={{ color: "#1671ee" }}
                            >
                              {chunks}
                            </strong>
                          ),
                          br: (chunks) => (
                            <strong style={{ color: "#890611" }}>
                              {chunks}
                            </strong>
                          ),
                          rotp: (chunks) => (
                            <strong
                              className="important"
                              style={{ color: "#1671ee", cursor: "pointer" }}
                              onClick={getOtp}
                            >
                              {chunks}
                            </strong>
                          ),
                          email: `${LoginForm.email}`,
                        }}
                      >
                        {(chunks) => <p>{chunks}</p>}
                      </FormattedMessage>
                    </p>
                  </div>
                )}
                <div className="HorizontalSignup-dashedline"></div>
                {LoginError.errorCode !== "user_blocked" ? (
                  <div className="LoginBottomHeading">
                    <div>{translate("Do_not_have_an_account")}</div>
                    <div
                      className="Login-page-link"
                      onClick={() => {
                        changePage();
                      }}
                    >
                      {translate("Create_one_now")}
                    </div>
                  </div>
                ) : (
                  <div className="LoginBottomHeading">
                    <p>
                      <FormattedMessage
                        id="We_just_sent_an_email_with_a_link_to_unlock_your_account_You_may_sign_in_with_a_otp_try_resetting_your_password_or_Contact_Support"
                        defaultMessage="We sent a one-time passcode to <b>{email}</b>"
                        values={{
                          a: (chunks) => (
                            <strong
                              className="important"
                              style={{ color: "#1671ee", cursor: "pointer" }}
                            >
                              {chunks}
                            </strong>
                          ),
                        }}
                      >
                        {(chunks) => <p>{chunks}</p>}
                      </FormattedMessage>
                    </p>
                  </div>
                )}
              </div>
            </div>
            {LoginError.errorCode !== "user_blocked" ? (
              <div className="LoginRightWrapper">
                <Login
                  LoginError={LoginError}
                  onChange={onChange}
                  switchLogin={switchLogin}
                  onSubmit={onSubmit}
                  LoginForm={LoginForm}
                  onToggle={onToggle}
                  onPressContinue={onPressContinue}
                  Continue={Continue}
                  getOtp={getOtp}
                  validateEmail={validateEmail}
                  socialBtn={socialBtn}
                  hideEmail={hideEmail}
                  LoginText={LoginText}
                  otpValid={otpValid}
                  setOtpValid={setOtpValid}
                  handleForgotPasswordClick={handleForgotPasswordClick}
                  setTimer={setTimer}
                  trackClickEvent={trackClickEvent}
                />
              </div>
            ) : switchLogin === "login-with-password" ? (
              <PasswordBlockScreen blockScreenToggle={blockScreenToggle} />
            ) : (
              <OtpBlockScreen
                onChange={onChange}
                LoginError={LoginError}
                LoginForm={LoginForm}
                validateEmail={validateEmail}
                onSubmit={onSubmit}
                trackClickEvent={trackClickEvent}
                LoginText={LoginText}
                handleForgotPasswordClick={handleForgotPasswordClick}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LoginUI;

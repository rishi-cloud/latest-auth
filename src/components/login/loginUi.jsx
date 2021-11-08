import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import { CommonDataContext } from "../../providers/CommonDataContext";
import "./style.css";
import Login from "./Login";
import translate from "../../localization/translate";
import CircularLoader from "../../loader/CircularLoader";
import { ReactComponent as McAfeeLogo } from "../../svg/Mcafee-Logo.svg";
import Timer from "../Timer/index";

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
  } = props;
  const { LoginText } = useContext(CommonDataContext);
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
                <div className="LoginIntroSubHeading">
                  {translate(LoginText.subtitle)}
                </div>
                {otpTimer ? (
                  <Timer
                    initialMinute={3}
                    setOtpValid={setOtpValid}
                    setTimer={setTimer}
                    TimerState={TimerState}
                    getOtp={getOtp}
                  />
                ) : null}
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
              </div>
            </div>
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
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginUI;

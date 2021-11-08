import React, { useContext } from "react";
import "./style.css";
import translate from "../../localization/translate";
import PasswordFlow from "./password";
import PasswordLessFlow from "./passwordless";
import { CommonDataContext } from "../../providers/CommonDataContext";

const Login = (props) => {
  const {
    onChange,
    switchLogin,
    onSubmit,
    LoginError,
    LoginForm,
    hideEmail,
    onToggle,
    validateEmail,
    getOtp,
    LoginText,
    otpValid,
    setOtpValid,
    handleForgotPasswordClick,
  } = props;
  const { utagData } = useContext(CommonDataContext);

  const trackClickEvent = (navElement) => {
    let utag = window.utag;
    let updatedUtagData = { ...utagData };
    updatedUtagData["tm_global_tealium_calltype"] = "manual";
    updatedUtagData["tm_global_navigation_element"] = navElement;
    updatedUtagData["tm_global_navigation_element_click"] = "true";
    utag?.link(updatedUtagData);
  };

  return (
    <div className="LoginWrapperContainer">
      <form className="LoginInputWrapper">
        {switchLogin === "login-with-password" && (
          <PasswordFlow
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

        {switchLogin === "login-with-otp" && (
          <PasswordLessFlow
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            getOtp={getOtp}
            hideEmail={hideEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
            otpValid={otpValid}
            setOtpValid={setOtpValid}
          />
        )}
      </form>
      {LoginError.errorCode && (
        <div className="Error">{translate(LoginError.errorCode)}</div>
      )}

      <div className="SwitchContainer">
        <div className="Switch">{translate("or")}</div>

        {switchLogin === "login-with-password" && (
          <>
            <button className="SwitchBtn" onClick={onToggle}>
              <div id="Sigin-With-OTP">
                {translate("Sign_in_with_a_onetime_passcode")}
              </div>
            </button>
            <div className="opt-info">{translate("we_will_send_otp")}</div>
          </>
        )}
        {switchLogin === "login-with-otp" && (
          <button className="SwitchBtn" onClick={onToggle}>
            <div>{translate("signIn_with_password")}</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;

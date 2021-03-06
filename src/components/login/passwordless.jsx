import React from "react";
import { TealiumTagValueConstans } from "../../constants/TealiumConstants";
import translate from "../../localization/translate";

import { ReactComponent as OutlineMail } from "../../svg/mailIcon.svg";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";

const PasswordLessFlow = (props) => {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    getOtp,
    hideEmail,
    onSubmit,
    trackClickEvent,
    LoginText,
    otpValid,
  } = props;

  return (
    <>
      {!hideEmail && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="LoginInputContainer">
            {LoginForm.email !== "" ? (
              <div
                className="LoginInputLabel"
                style={{
                  color: validateEmail(LoginForm.email) ? "#0CA77D" : "red",
                }}
              >
                {translate("email")}
              </div>
            ) : null}
            <div
              style={{
                flex: 1,
                display: "flex",
                border:
                  LoginError.isEmailError === true
                    ? "1px solid red"
                    : validateEmail(LoginForm.email)
                    ? "1px solid #0CA77D"
                    : "1px solid #848faa",
                backgroundColor: "#ffff",
                borderRadius: "1rem",
              }}
            >
              <OutlineMail
                className="LoginInputLogo"
                style={{
                  color: validateEmail(LoginForm.email) ? "green" : "",
                }}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={LoginForm.email}
                placeholder="Email"
                className="LoginInput"
                onChange={onChange}
              />
              {validateEmail(LoginForm.email) &&
              LoginText.title === "Looks_like_you_already_have_an_account" ? (
                <TickIcon
                  style={{
                    height: "2rem",
                    width: "2rem",
                    marginTop: "0.8rem",
                    marginRight: "0.2rem",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
      {LoginError.email && <div className="Error">{LoginError.email}</div>}

      {LoginForm.otpAvailable && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="LoginInputContainer"
            style={{ border: `1px solid ${otpValid ? "#848faa" : "red"}` }}
          >
            {LoginForm.otp !== "" ? (
              <div
                className="LoginInputLabel"
                style={{ color: otpValid ? "#848faa" : "red" }}
              >
                {translate("one_time_passcode")}
              </div>
            ) : null}
            <input
              type="text"
              pattern="\d*"
              maxlength="6"
              id="otp"
              name="otp"
              placeholder="One-time passcode"
              className="LoginInput"
              onChange={onChange}
            />
          </div>
          <div className="LoginOtpResendContainer" onClick={getOtp}>
            <div className="LoginResendBtn">{translate("ResendCode")}</div>
          </div>
        </div>
      )}
      <button
        className="RequestOtp"
        onClick={(e) =>
          onSubmit(e) && trackClickEvent(TealiumTagValueConstans.SIGNIN_BUTTON)
        }
        disabled={
          !validateEmail(LoginForm.email) ||
          LoginForm.isSubmitting ||
          !otpValid ||
          (LoginForm.otpAvailable && !LoginForm.otp)
        }
        style={{
          backgroundColor:
            !validateEmail(LoginForm.email) ||
            LoginForm.isSubmitting ||
            !otpValid ||
            (LoginForm.otpAvailable && !LoginForm.otp)
              ? "gray"
              : "",
          cursor: LoginForm.isSubmitting ? "progress" : "pointer",
        }}
      >
        {LoginForm.otpAvailable ? (
          <div>{translate("continue")}</div>
        ) : (
          <div>{translate("continue")}</div>
        )}
      </button>

      {LoginForm.otpAvailable && (
        <div className="LoginOptMessageContainer">
          <div className="LoginOtpMessage">
            <div>
              {translate("If_you_didnt_receive_a_passcode")} ,{" "}
              {translate("check_your_spam_folder")}
            </div>
          </div>
          <div className="ContactSupport">
            <div>Need Help?</div>
            <div
              style={{
                margin: "0 5px",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Contact Support
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordLessFlow;

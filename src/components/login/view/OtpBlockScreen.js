import React from "react";

import PasswordFlow from "../password";

function OtpBlockScreen(props) {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    onSubmit,
    trackClickEvent,
    LoginText,
    handleForgotPasswordClick,
  } = props;
  return (
    <div className="LoginRightWrapper">
      <div className="LoginWrapperContainer">
        <form className="LoginInputWrapper">
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
        </form>
      </div>
    </div>
  );
}

export default OtpBlockScreen;

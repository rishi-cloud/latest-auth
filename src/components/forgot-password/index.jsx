import React from "react";
import ForgotPasswordContainer from "../../containers/ForgotPasswordContainer";
import ForgotPasswordUI from "./ForgotPasswordUI";

function ForgotPassword(props) {
  return (
    <ForgotPasswordContainer {...props}>
      <ForgotPasswordUI />
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword;

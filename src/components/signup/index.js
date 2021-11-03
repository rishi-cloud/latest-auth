import React from "react";
import SignupContainer from "../../containers/signupContainer";
import SignupUI from "./SignupUI";

const Signup = (props) => {
  return (
    <SignupContainer {...props}>
      <SignupUI />
    </SignupContainer>
  );
};
export default Signup;

import React, { useEffect, useContext } from "react";
import LoginContainer from "../../containers/loginContainer";
import LoginUI from "./loginUi";
import {
  TealiumTagKeyConstants,
  TealiumTagValueConstans,
} from "../../constants/TealiumConstants";
import { TrackingContext } from "../../providers/TrackingProvider";

const Login = (props) => {
  const { utagData, setUtagData } = useContext(TrackingContext);

  useEffect(() => {
    let utag = window.utag;
    let updatedUtagData = {
      ...utagData,
      [TealiumTagKeyConstants.TEALIUM_PAGE_NAME]: [
        TealiumTagValueConstans.LOGIN_PAGE_NAME,
      ],
    };
    utag.view({
      ...updatedUtagData,
      [TealiumTagKeyConstants.TEALIUM_PAGE_PUBLISH_DATE]: new Date(),
    });
    setUtagData(updatedUtagData);
  }, []);

  return (
    <LoginContainer {...props}>
      <LoginUI />
    </LoginContainer>
  );
};
export default Login;

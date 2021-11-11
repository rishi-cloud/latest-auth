import React from "react";
import translate from "../../../localization/translate";

function PasswordBlockScreen(props) {
  const { blockScreenToggle } = props;
  return (
    <div className="LoginRightWrapper">
      <div className="BlockUserDiv">
        <button
          className="EmailBlockSwitchBtn"
          onClick={() => blockScreenToggle("with-otp")}
        >
          <div id="Sigin-With-OTP">
            {translate("Sign_in_with_a_onetime_passcode")}
          </div>
        </button>
        <div className="block-otp-info">{translate("we_will_send_otp")}</div>

        <div className="Horizontal-dashedline"></div>

        <div
          className="Signup-page-link"
          onClick={() => blockScreenToggle("with-password")}
        >
          {translate("Sign_in_with_a_different_email_address")}
        </div>
      </div>
    </div>
  );
}

export default PasswordBlockScreen;

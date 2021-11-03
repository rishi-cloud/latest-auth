import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TrackingContext } from "./TrackingProvider";

const SettingContext = React.createContext({});

const SettingProvider = (props) => {
  const [setting, setSetting] = useState(null);
  const { trackClickEvent } = useContext(TrackingContext);
  //   useEffect(() => {
  //     const getSettings = async () => {
  //       try {
  //         const res = await axios.get(process.env.REACT_APP_SETTINGS_LINK);
  //         setSetting(res);
  //       } catch (err) {
  //         console.log(err);
  //
  //       }
  //     };
  //     getSettings();
  //     trackClickEvent("Failure-while-fetching-settings");
  //   }, []);

  return (
    <SettingContext.Provider value={{ setting }}>
      {props.children}
    </SettingContext.Provider>
  );
};

export { SettingProvider, SettingContext };

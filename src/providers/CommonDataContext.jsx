/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { TrackingContext } from "./TrackingProvider";

import axios from "axios";

const CommonDataContext = React.createContext({});

const CommonDataProvider = (props) => {
  // Initializing the states
  const [connections, setConn] = useState([]);
  const [LoginText, setLoginText] = useState({
    title: "Sign_into_your_McAfee_account",
    subtitle: "choose_your_signIn_method_continue",
  });
  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
    otp: "",
    otpAvailable: false,
    isSubmitting: false,
  });

  // Tracking Event function from Context
  const { trackClickEvent } = useContext(TrackingContext);

  useEffect(() => {
    const getCommonData = async () => {
      try {
        // `https://${props.config.auth0Domain}/client/${props.config.clientID}.js`
        const res = await axios.get(
          `/client/soKVdT2wmzd71LKYoZpv6FJMTg6yQ238.js`
        );
        const data = res.data;
        if (typeof data === "string") {
          const filteredData = data.slice(16, -2);
          const jsonData = JSON.parse(filteredData);
          const DB_ARRAY = jsonData?.strategies[0]?.connections.filter(
            (item) => item.name === "Username-Password-Authentication"
          );
          console.log("DB ARRAY RECIVED", DB_ARRAY);
          setConn(DB_ARRAY);
        }
      } catch (err) {
        trackClickEvent("Failure-while-fetching-password-policy");
        console.log(err);
      }
    };
    getCommonData();
  }, []);
  return (
    <CommonDataContext.Provider
      value={{
        connections,
        LoginText,
        setLoginText,
        LoginForm,
        setLoginForm,
      }}
    >
      {props.children}
    </CommonDataContext.Provider>
  );
};

export { CommonDataProvider, CommonDataContext };

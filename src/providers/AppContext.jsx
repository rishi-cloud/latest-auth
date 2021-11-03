import React, { useState } from "react";

const AppContext = React.createContext({});

const AppProvider = (props) => {
  const [whichPage, setWhichPage] = useState("login-page");
  return (
    <AppContext.Provider
      value={{
        whichPage,
        setWhichPage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

import React, { Fragment, useContext } from "react";
import { IntlProvider } from "react-intl";
import { SettingContext } from "../providers/SettingProvider";

import messages from "./messages";

const LanguageProvider = ({ children, locale }) => {
  const { setting } = useContext(SettingContext);
  return (
    <IntlProvider
      textComponent={Fragment}
      locale={locale}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};
export default LanguageProvider;

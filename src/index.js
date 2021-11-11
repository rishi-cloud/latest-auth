import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import "./index.css";

// window.LoginWidget = class LoginWidget {
//     init(opts) {
//         const pageConfig = opts.pageConfig;
//         if (!pageConfig) {
//             console.log("hello");
//             throw new Error("pageConfig must be provided in opts");
//         }
//     }
// };

import { BrowserRouter } from "react-router-dom";

// window.LoginWidget = class LoginWidget {
//   init(opts) {
//     const pageConfig = opts.pageConfig;
//     if (!pageConfig) {
//       throw new Error("pageConfig must be provided in opts");
//     }

//     ReactDOM.render(
//       <BrowserRouter>
//         <App pageConfig={pageConfig} />
//       </BrowserRouter>,
//       document.getElementById("root")
//     );
//   }
// };
ReactDOM.render(
  <BrowserRouter>
    <App pageConfig={{ clientName: "Custom Client Name" }} />
  </BrowserRouter>,
  document.getElementById("root")
);

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//     document.getElementById("root")
// );

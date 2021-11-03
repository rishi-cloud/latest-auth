import React from "react";
import "./style.css";

const DashboardUI = () => {
    const user = JSON.parse(localStorage.getItem("userData"));

    return (
        <>
            <div className="DashboardContainer">
                <div className="DashBoardHeading">Welcome to DashBoard... </div>
                <div
                    className="UserImg"
                    style={{ backgroundImage: `url(${user?.picture})` }}
                ></div>
                <div className="UserName">{user.name}</div>
            </div>
        </>
    );
};
export default DashboardUI;

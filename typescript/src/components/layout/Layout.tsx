import React, { useState, useRef, useContext } from "react";
import RouterComponent from "../../routes/RouterComponent";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/layout.scss";
const Layout: React.FC<{ pageContext?: { layout: string } }> = ({
  pageContext,
}) => {
  return (
    <>
      <div className="plm-app-layout-container">
        <div className="plm-app-layout-content">
          <Router>
            <RouterComponent />
          </Router>

          <div className="plm-app-layout-panel-content"></div>
        </div>
      </div>
    </>
  );
};
export default Layout;

import { maxHeight, maxWidth, width } from "@mui/system";
import React from "react";
import "./FirstPage.css";

import NavBar from "./NavBar";
import NavBar2 from "../../User/NavBar2";

function FirstPage() {
  return (
    <div className="FirstPage">
      {localStorage.getItem("isLogin") ? <NavBar2 /> : <NavBar />}
      <div className="PozaHome">
        <img src="images/Form.png" alt="Logo" />
      </div>
      <div className="Welcome">
        <h4>Welcome to Intelligent Forms!</h4>
      </div>
      <div className="Semnatura">
        <img src="images/Desen.png" alt="Logo" />
      </div>
      <div className="Text">
        Here, we provide intelligent forms solutions to help streamline your
        data collection process. Say goodbye to manual data entry and hello to
        efficiency with Intelligent Forms.
      </div>

      <div className="Delimitation">© 2023 INTELLIGENT FORMS</div>
    </div>
  );
}

export default FirstPage;

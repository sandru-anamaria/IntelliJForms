import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Profile from "../../User/Profile/Profile";
import Templates from "../../User/Templates/Templates";
import Update_Form from "../../User/UpdateForm/Update_Form";
import FirstPage from "../FirstPage/FirstPage";
import LoginPage from "../LoginPage/LoginPage";
import Submissions_Forms from "../../User/Submissions/Submissions_Forms";
import FillForm from "../../FillForm/FillForm";
import { useState } from "react";
function AppRouter() {

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") == true
  );
  return (
    <Router>
      <Routes>
        <Route
          exact
          path=""
          element={
           <FirstPage /> 
           
           
          }
        />
        <Route
          path={
            localStorage.getItem("isLogin") ? "/Update_Form" : "/Contact_Us"
          }
          element={localStorage.getItem("isLogin") && <Update_Form />}
        />
        <Route
          exact
          path={localStorage.getItem("isLogin") && "/Submissions_Forms/:id"}
          element={localStorage.getItem("isLogin") && <Submissions_Forms />}
        />
         <Route
          exact
          path={localStorage.getItem("isLogin") && "/Create_Form"}
          element={<Templates />}
        />
        <Route       
          exact
          path={
           "/Login_Register"
          }
          element={
             <LoginPage />
          }
        />
        <Route path={"/FillForm/:id"} element={<FillForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

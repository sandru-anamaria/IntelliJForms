import React, { useState } from "react";
import NavBar from "../FirstPage/NavBar";
import "./LoginPage.css";
import { loginUserAPI } from "../../API/UserAPI/UserAPI";
import { createUserAPI } from "../../API/UserAPI/UserAPI";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Test(props) {
  const location = useLocation();

  function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const signIn = async () => {
      const LoginCredential = {
        emailAddress: email,
        password: password,
      };

      setIsLoading(true);
      setEmailError("");
      setPasswordError("");

      try {
        const response = await loginUserAPI(LoginCredential);
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("isLogin", true);
          localStorage.setItem("userId", response.data.id);
          console.log(localStorage);
          navigate("/Update_Form");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      }
      setIsLoading(false);
    };

    const validateForm = () => {
      let valid = true;
      if (!email) {
        setEmailError("Email is required!");
        valid = false;
      } else {
        setEmailError("");
      }
      if (!password) {
        setPasswordError("Password is required!");
        valid = false;
      } else {
        setPasswordError("");
      }
      return valid;
    };

    return (
      <div className="LoginForm">
        <label className="Label" htmlFor="email1">
          Email
        </label>
        <input
          className="Input"
          placeholder="Enter your email address"
          type="email"
          id="email1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <div className="ErrorMessage ErrorStyle">{emailError}</div>
        )}
        <label className="Label" htmlFor="pwd1">
          Password
        </label>
        <input
          className="Input"
          placeholder="Enter your password"
          type="password"
          id="pwd1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {passwordError && (
          <div className="ErrorMessage ErrorStyle">{passwordError}</div>
        )}

        <button
          className="SubmitButton Hover"
          type="submit"
          id="submt"
          onClick={() => {
            if (validateForm()) {
              signIn();
            }
          }}
          disabled={isLoading ? true : false}
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </div>
    );
  }

  function RegisterForm() {
    const [registerName, settingName] = useState("");
    const [registerEmail, settingEmail] = useState("");
    const [registerAddress, settingAddress] = useState("");
    const [registerPassword, settingPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [nameError, setNameError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerResponse, setRegisterResponse] = useState("");

    function registered() {
      window.location.href = "#/Login_Register";
    }

    const signUp = async () => {
      setIsLoading(true);
      setIsLoading(true);
      setEmailError("");
      setPasswordError("");
      setAddressError("");
      setNameError("");

      try {
        const RegisterCredential = {
          name: registerName,
          address: registerAddress,
          emailAddress: registerEmail,
          password: registerPassword,
        };
        const response = await createUserAPI(RegisterCredential);

        if (response.status == 200) {
          registered();
        } else {
        }
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      }
      setIsLoading(false);
    };

    const validateRegister = () => {
      let valid = true;
      if (!registerName) {
        setNameError("Name is required!");
        valid = false;
      } else {
        setNameError("");
      }
      if (!registerEmail) {
        setEmailError("Email is required!");
        valid = false;
      } else {
        setEmailError("");
      }
      if (!registerAddress) {
        setAddressError("Address is required!");
        valid = false;
      } else {
        setAddressError("");
      }
      if (!registerPassword) {
        setPasswordError("Password is required!");
        valid = false;
      } else {
        setPasswordError("");
      }
      return valid;
    };

    return (
      <div className="RegisterForm">
        <label className="Label" htmlFor="accountName">
          Name
        </label>
        <input
          min="3"
          max="50"
          className="Input"
          placeholder=" Enter your name"
          type="text"
          id="accountName"
          value={registerName}
          onChange={(e) => settingName(e.target.value)}
        />
        {nameError && (
          <div className="ErrorMessage ErrorStyle">{nameError}</div>
        )}
        <label className="Label" htmlFor="address">
          Address
        </label>
        <input
          min="8"
          max="50"
          className="Input"
          placeholder=" Enter your address"
          type="text"
          id="address"
          value={registerAddress}
          onChange={(e) => settingAddress(e.target.value)}
        />
        {addressError && (
          <div className="ErrorMessage ErrorStyle">{addressError}</div>
        )}

        <label className="Label" htmlFor="email2">
          Email
        </label>
        <input
          className="Input"
          placeholder="name@gmail.com"
          type="email"
          id="email2"
          value={registerEmail}
          onChange={(e) => settingEmail(e.target.value)}
        />
        {emailError && (
          <div className="ErrorMessage ErrorStyle">{emailError}</div>
        )}

        <label className="Label" htmlFor="pwd2">
          Password
        </label>
        <input
          min="5"
          max="50"
          className="Input"
          placeholder=" Enter a password"
          type="password"
          id="pwd2"
          value={registerPassword}
          onChange={(e) => settingPassword(e.target.value)}
        />
        {passwordError && (
          <div className="ErrorMessage ErrorStyle">{passwordError}</div>
        )}

        <button
          className="SubmitButton"
          type="submit"
          id="submt"
          onClick={() => {
            if (validateRegister()) {
              signUp();
            }
          }}
          disabled={isLoading ? true : false}
        >
          Register
        </button>
      </div>
    );
  }

  const [login, setlogin] = useState(true);
  const [register, setregister] = useState(false);

  function LoginClik() {
    setlogin(true);
    setregister(false);
  }

  function RegisterClick() {
    setlogin(false);
    setregister(true);
  }

  const handlesubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Test">
      <NavBar />
      <div className="main-login">
        <div className="Login-contain">
          <div className="Left-side">
            <form className="formClass" onSubmit={handlesubmit}>
              <button className="LoginButton" onClick={LoginClik}>
                Log In
              </button>
              <button className="RegisterButton" onClick={RegisterClick}>
                Register
              </button>
              {login && <LoginForm />}

              {register && <RegisterForm />}
            </form>
          </div>
          <div className="Right-side">
            <div className="PozaLogin">
              {login && <img src="images/LoginPage.png" alt="Logo" />}
            </div>
            <div className="Poza">
              {register && <img src="images/Register.png" alt="Logo" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;

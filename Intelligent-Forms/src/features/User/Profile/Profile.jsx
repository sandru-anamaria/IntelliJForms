import React, { useState } from "react";
import NavBar2 from "../NavBar2";
import "./ProfilePage.css";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import useSWR from "swr";

import { readSingleUserAPI } from "../../API/UserAPI/UserAPI";

function logOut() {
  localStorage.clear();
  window.location.href= "/";
}

function Profile() {
  const [login, setlogin] = useState(true);
  const [register, setregister] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [activeUserID] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem("userId")))
  );

  const { data: activeUser } = useSWR(
    activeUserID && localStorage.getItem("userId"),
    readSingleUserAPI
  );
  console.log(localStorage.getItem("userId"));

  function RegisterForm() {
    return (
      <div className="RegisterForm">
        <label className="Label" htmlFor="accountName">
          Account Name
        </label>
        <input
          className="Field Focus"
          placeholder=" Enter your name"
          type="text"
          id="accountName"
          value={activeUser?.name}
        />
        <label className="Label" htmlFor="address">
          Address
        </label>
        <input
          className="Field Focus"
          placeholder=" Enter your address"
          type="text"
          id="address"
          value={activeUser?.address}
        />
        <label className="Label" htmlFor="email2">
          Email
        </label>
        <input
          className="Field Focus"
          placeholder=" Enter your email..."
          type="email"
          id="email2"
          value={activeUser?.emailAddress}
        />
        {}
      </div>
    );
  }

  function LoginClik() {
    setlogin(true);
    setregister(false);
  }

  function RegisterClick() {
    setlogin(false);
    setregister(true);
  }
  function EditClick() {
    setEdit(true);
  }

  function CancelClick() {
    setEdit(false);
  }
  const handlesubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Profile">
      <NavBar2 />
      <div className="main-login">
        <div className="Login-contain">
          <div className="Left-side">
            <form onSubmit={handlesubmit}>
              <div className="Poza">
                <img src="images/ProfilePage.png" alt="Logo" />
              </div>
            </form>
            <label className="Mpf">My Profile </label>
          </div>
          <div className="Right-side Padding">
            <RegisterForm />

            <br></br>
            <button onClick={logOut} className="ButtonEdit">
              LogOut
            </button>
          </div>
        </div>
      </div>
      <div className="Delimitation">© 2023 INTELLIGENT FORMS</div>
    </div>
  );
}

export default Profile;

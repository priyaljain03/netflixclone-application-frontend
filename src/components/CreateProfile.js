import React, { useState } from 'react';
import { useNavigate,Link } from "react-router-dom"
import "../css/CreateProfile.css";
import { axiosInstance } from "../axios";

function CreateProfile() {
  const [credentials, setCredentials] = useState({ name: "", maturity_setting: "all" })
  const [errors, setErrors] = useState({ nameError: "", otherErrors: "" })
  const navigate = useNavigate()

  const validate = () => {
    const errosDict = { nameError: "", otherErrors: "" }
    if (credentials.name.length <= 0) {
      errosDict.nameError = "Enter a Valid Name for Profile"
    }

    if (errosDict.nameError != "") {
      setErrors(errosDict)
      return true
    } else {
      setErrors(errosDict)
      return false
    }
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = ((e) => {
    e.preventDefault();
    if (validate() === false) {
      axiosInstance.post(`user/profiles/`, {
        "name": credentials.name,
        "maturity_setting": credentials.maturity_setting
      }).then(res => {
        navigate('/browse')
      }).catch(err => {
        const errs = ["heelo"]
        errs.push(err.message)
        setErrors(errs)
      })
    }

  })


  return <div className="create__profileform">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>


    <div className="container">
      <h1>Create Profile</h1>
      <div className="form__wrapper">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>

        <form onSubmit={handleSubmit}>

          <input placeholder="Name" name="name" autocomplete="off" onChange={handleChange} />
          {errors.nameError != "" ? <p style={{ color: "orange" }}>{errors.nameError}</p> : ""}

          <label htmlFor="maturity_setting">Maturity Settings</label>
          <select name="maturity_setting" id="cars" onChange={handleChange}>
            <option value="all">All</option>
            <option value="kids">Kids</option>
          </select>

          <div className="create__buttons">
            <button className="save__button" type="submit">Save</button>
            <button className="cancel__button"><Link to="/profiles">Cancel</Link></button>
          </div>
        </form>
      </div>
    </div>


  </div>;
}

export default CreateProfile;

import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom"
import "../css/CreateProfile.css";
import { axiosInstance } from "../axios";

function CreateProfile() {
  const [profileInfo, setprofileInfo] = useState({})
  const state = useLocation()
  const profileId = state.state.profileId

  useEffect(() => {
    const response = axiosInstance.get(`user/profiles/${profileId}`)
      .then(resp => {
        setprofileInfo({ ...resp.data })
      })

  }, [])

  const handleSubmit = () => {
    axiosInstance.put(`user/profiles/${profileId}`, {
      data: profileInfo
    })
      .then(resp => console.log(resp))
  }

  const handleChange = (e) => {
    setprofileInfo({ ...profileInfo, [e.target.name]: e.target.value })
  }
  return <div className="create__profileform">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>


    <div className="container">
      <h1>Edit Profile</h1>
      <div className="form__wrapper">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>

        <form onSubmit={handleSubmit}>

          <input placeholder="Name" name="name" autocomplete="off" onChange={handleChange} value={profileInfo.name} />
          {/* {errors.nameError != "" ? <p style={{ color: "orange" }}>{errors.nameError}</p> : ""} */}

          <label htmlFor="maturity_setting">Maturity Settings</label>
          <select name="maturity_setting" id="cars" onChange={handleChange} value={profileInfo.maturity_setting}>
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

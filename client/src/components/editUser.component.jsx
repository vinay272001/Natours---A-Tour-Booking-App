import React, { useState } from "react"
import "../assets/css/style.css"
import cookie from "js-cookie"
import axios from "axios"
import {Redirect,Link} from "react-router-dom"

const EditUser = ()=>{
    const [name,setName] = useState(cookie.get("userName"))
    const [email,setEmail] = useState(cookie.get("userEmail"))
    const [password,setPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [image,setImage] = useState(null)
    const token = cookie.get("jwt")
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    if(!cookie.get("jwt")){
        return(<Redirect to = "/login"/>)
    }
    return(
        <React.Fragment>
        <div className="user-view">
        <nav className="user-view__menu">
                <ul className="side-nav">
                    <li className="side-nav--active">
                        <Link to="/me">
                            <svg>
                        <use xlinkHref="/img/icons.svg#icon-settings"></use>
                        </svg>
                        Settings
                    </Link>
                </li>
                <li>
                    <Link to="/myBookings">
                        <svg>
                        <use xlinkHref="/img/icons.svg#icon-briefcase"></use>
                        </svg>
                        My bookings
                    </Link>
                </li>
                <li>
                    <Link to="/myReviews">
                        <svg>
                        <use xlinkHref="/img/icons.svg#icon-star"></use>
                        </svg>
                        My reviews
                    </Link>
                </li>
            </ul>
            </nav>
        <div className="user-view__content">
           <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
              <form className="form form-user-data" id = "updateUserForm">
                 <div className="form__group">
                    <label className="form__label" htmlFor="name">Name</label>
                     <input className="form__input" id="name" type="text" placeholder={cookie.get("userName")} required name="name" />
                </div>
                 <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">Email address</label>
                    <input className="form__input" id="email" type="email" placeholder={cookie.get("userEmail")} required name="email" />
                </div>
                <div class="form__group form__photo-upload">
                    <img class="form__user-photo" src={`/img/users/${cookie.get("userPhoto")}`} alt="User photo"/>
                    <input class="form__upload" type="file" accept="image/*" id="photo" name="photo"/>
                    <label htmlFor="photo">Choose new photo</label>
                 </div>
                 <div className="form__group right"><button className="btn btn--small btn--green" onClick = {async (event)=>{
                    event.preventDefault();
                    let formdata = new FormData(document.getElementById("updateUserForm"))
                    try{ 
                        const response = await axios.patch("http://localhost:8000/api/users/updateuser",formdata,config)
                        alert("Your details have been updated");
                        cookie.set("userName",response.data.data.name,{expires : 30})
                        cookie.set("userEmail",response.data.data.email,{expires : 30})
                        cookie.set("userPhoto",response.data.data.photo,{expires : 30})
                        window.location.reload(true);
                    }catch(err){
                        alert(err.response.data.message)
                    }
                 }}>Save settings</button>
                 </div>
              </form>
           </div>
           <div className="line">&nbsp;</div>
           <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Password change</h2>
              <form className="form form-user-password">
                 <div className="form__group"><label className="form__label" htmlFor="password-current">Current password</label>
                    <input className="form__input" id="password-current" type="password" placeholder="••••••••" required="" minlength="8" onChange = {(event)=>{
                         setPassword(event.target.value)
                     }}/>
                </div>
                 <div className="form__group"><label className="form__label" htmlFor="password">New password</label>
                    <input className="form__input" id="password" type="password" placeholder="••••••••" required="" minlength="8" onChange = {(event)=>{
                         setNewPassword(event.target.value)
                     }}/>
                </div>
                 <div className="form__group ma-bt-lg">
                    <label className="form__label" htmlFor="password-confirm">Confirm password</label>
                    <input className="form__input" id="password-confirm" type="password" placeholder="••••••••" required="" minlength="8" onChange = {(event)=>{
                         setConfirmPassword(event.target.value)
                     }}/>
                </div>
                 <div className="form__group right">
                    <button className="btn btn--small btn--green btn--save-password" onClick = {async (event)=>{
                        event.preventDefault();
                        if(newPassword !== confirmPassword){
                            return alert("Passwords do not match!")
                        }
                        try{
                            const response = await axios.patch("http://localhost:8000/api/users/updatepassword",{password,newPassword},config)
                            alert("Password changed succesfully! Please login again using new Password")
                            cookie.remove("jwt")
                            cookie.remove("userName")
                            cookie.remove("userEmail")
                            cookie.remove("userPhoto")
                            window.location.reload(true)
                        }catch(err){
                            alert(err.response.data.message)
                        }
                    }}>Save password</button>
                </div>
              </form>
           </div>
        </div>
        </div>
     </React.Fragment>
    )
}

export default EditUser;
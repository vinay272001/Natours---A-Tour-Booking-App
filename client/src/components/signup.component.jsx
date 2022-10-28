import React, { useState } from "react"
import "../assets/css/style.css"
import {Redirect} from "react-router-dom"
import axios from "axios"
import cookie from "js-cookie"

const reload = ()=>{
    window.location.reload(true);
}

const Signup = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    if(cookie.get("jwt")){
        return(
            <Redirect to = "/"/>
        )
    }else{
        return (<div className = "login-form">
        <h2 className ="heading-secondary ma-bt-lg">Create your account</h2>
        <form className ="form form--login">
           <div className ="form__group">
                <label className ="form__label" htmlFor="name">Your Name</label>
                <input className="form__input" id="name" type="text" placeholder="Your Name" required onChange={(event=>setName(event.target.value))}/>
           </div>
           <div className ="form__group ma-bt-md">
                <label className ="form__label" htmlFor="email">Email</label>
                <input className="form__input" id="email" type="email" placeholder="you@example.com" required onChange={(event=>setEmail(event.target.value))}/>
           </div>
           <div className ="form__group ma-bt-md">
                <label className ="form__label" htmlFor="password">Password</label>
                <input className="form__input" id="password" type="password" placeholder="••••••••" required minlength="8" onChange={(event=>setPassword(event.target.value))}/>
           </div>
           <div className ="form__group ma-bt-md">
                <label className ="form__label" htmlFor="password">Confirm Password</label>
                <input className="form__input" id="confirmPassword" type="password" placeholder="••••••••" required minlength="8" onChange={(event=>setConfirmPassword(event.target.value))}/>
           </div>
           <div className ="form__group">
                <button className="btn btn--green" onClick = {async(event)=>{
                    event.preventDefault()
                    if(password !== confirmPassword){
                        return alert("Password is not equal to confirm Password");
                    }
                    try{
                        const response = await axios.post("http://localhost:8000/api/users/signup",{name,email,password})
                        if(response.data.status === "success"){
                            cookie.set("jwt",response.data.token,{expires : 30})
                            cookie.set("userName",response.data.data.name,{expires : 30})
                            cookie.set("userPhoto",response.data.data.photo,{expires : 30})
                            cookie.set("userEmail",response.data.data.email,{expires : 30})
                            reload();
                        }else{
                            alert(response.data.message)
                        }
                    }catch(err){
                        alert(err.response.data.message)
                    }
                }
            }>Sign Up</button>
           </div>
        </form>
        </div>)
    }
}

export default Signup;
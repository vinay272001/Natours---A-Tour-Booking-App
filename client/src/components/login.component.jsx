import React, { useState } from "react"
import "../assets/css/style.css"
import axios from "axios"
import cookie from "js-cookie"
import {Link, Redirect} from "react-router-dom"

const reload = ()=>{
    window.location.reload(true);
}

const Login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    if(cookie.get("jwt")){
        return(
            <Redirect to = "/"/>
        )
    }else{
        return (<div className = "login-form">
        <h2 className ="heading-secondary ma-bt-lg">Log lldo your account</h2>
        <form className ="form form--login">
           <div className ="form__group"><label className ="form__label" htmlFor="email">Email address</label>
                <input className="form__input" id="email" type="email" placeholder="you@example.com" required="" onChange={(event=>setEmail(event.target.value))}/>
           </div>
           <div className ="form__group ma-bt-md">
                <label className ="form__label" htmlFor="password">Password</label>
                <input className="form__input" id="password" type="password" placeholder="••••••••" required="" minlength="8" onChange={(event=>setPassword(event.target.value))}/>
           </div>
           <div className ="form__group">
                <button className="btn btn--green" onClick = {async(event)=>{
                    event.preventDefault()
                    try{
                        const response = await axios.post("http://localhost:8000/api/users/login",{email,password})
                        cookie.set("jwt",response.data.token,{expires : 30})
                        cookie.set("userName",response.data.data.name,{expires : 30})
                        cookie.set("userPhoto",response.data.data.photo,{expires : 30})
                        cookie.set("userEmail",response.data.data.email,{expires : 30})
                        reload();
                    }catch(err){
                        alert(err.response.data.message)
                    }
                }
            }>Login</button>
           </div>
           <div className="form__group">
                <Link to = "/forgotPassword" className = "btn btn--green">Forgot Password</Link>
            </div>
        </form>
        </div>)
    }
}

export default Login;
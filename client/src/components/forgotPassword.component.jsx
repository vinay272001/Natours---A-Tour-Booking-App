import React,{useState} from "react"
import axios from "axios"
import { Redirect } from "react-router"

const ForgotPassword = ()=>{
    const [email,setEmail] = useState("")
    const [success,setSuccess] = useState(false)
    const [token,setToken] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    return(
        <React.Fragment>
            <div className="login-form">
                <h2 className ="heading-secondary ma-bt-lg">Enter your E-mail</h2>
                <form className ="form form--login">
                    <div className ="form__group">
                        <label className ="form__label" htmlFor="email">Email address</label>
                        <input className="form__input" id="email" type="email" placeholder="you@example.com" required="" onChange={(event=>setEmail(event.target.value))}/>
                    </div>
                    <div className="form__group">
                        <button className = "btn btn--green" onClick = {async (event)=>{
                            event.preventDefault()
                            try{
                                const response = await axios.post("http://localhost:8000/api/users/forgotpassword",{email})
                                setSuccess(true)
                            }catch(err){
                                alert(err.response.data.message)
                            }
                        }}
                        >Reset Password</button>
                    </div>
                </form>
            </div>
            {!success ? "" : (
            <div className="login-form">
                <h2 className ="heading-secondary ma-bt-lg">Enter received token</h2>
                <form className ="form form--login">
                    <div className ="form__group">
                        <label className ="form__label" htmlFor="email">Received Token</label>
                        <input className="form__input" id="email" type="text" required="" onChange={(event=>setToken(event.target.value))}/>
                    </div>
                    <div className ="form__group ma-bt-md">
                        <label className ="form__label" htmlFor="password">Password</label>
                        <input className="form__input" id="password" type="password" placeholder="••••••••" required minlength="8" onChange={(event=>setPassword(event.target.value))}/>
                    </div>
                    <div className ="form__group ma-bt-md">
                        <label className ="form__label" htmlFor="password">Confirm Password</label>
                        <input className="form__input" id="confirmPassword" type="password" placeholder="••••••••" required minlength="8" onChange={(event=>setConfirmPassword(event.target.value))}/>
                    </div>
                    <div className="form__group">
                        <button className = "btn btn--green" onClick = {async (event)=>{
                            event.preventDefault()
                            try{
                                if(password !== confirmPassword){
                                    alert("Both passwords should be the same!")
                                    return;
                                }
                                const response = await axios.patch(`http://localhost:8000/api/users/resetpassword/${token}`,{password})
                                alert("Your password is updated!")
                            }catch(err){
                                alert(err.response.data.message)
                            }
                        }}
                        >Reset Password</button>
                    </div>
                </form>
            </div>
            )}
        </React.Fragment>
    )
}

export default ForgotPassword
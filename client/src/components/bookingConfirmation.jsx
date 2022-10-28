import React,{useEffect} from "react"
import cookie from "js-cookie"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import axios from "axios"

const Confirm = ()=>{
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` }
    }
    const {tourId,price} = useParams()
    useEffect(async ()=>{
        try{
            const response = await axios.post("http://localhost:8000/api/bookings/createBooking",{tourId,price},config)
        }catch(err){
            alert(err.response.data.message)
        }
    },[])
    return (
        <div className = "login-form">
            <h1 className = "heading-secondary ma-bt-lg">Thank you for your Purchase!</h1>
            <br/>
            <br/>
            <Link to = "/home" className="btn btn--green">Explore other Tours</Link>
        </div>
    )
}

export default Confirm;
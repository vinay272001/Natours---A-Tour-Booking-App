import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import BCard from "./bookingsCard.component"
import cookie from "js-cookie"
import axios from "axios"

const MyBookings = ()=>{
    const token = cookie.get("jwt")
    const [tours,setTours] = useState([])
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    useEffect(async ()=>{
        const URL = "http://localhost:8000/api/bookings/bookingsByUser";
        const response = await axios.get(URL,config)   
        setTours(response.data.tours);
    },[])
    return (
        <div className = "user-view">
            <nav className="user-view__menu">
                <ul className="side-nav">
                    <li>
                        <Link to="/me">
                            <svg>
                        <use xlinkHref="/img/icons.svg#icon-settings"></use>
                        </svg>
                        Settings
                    </Link>
                </li>
                <li className="side-nav--active">
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
            
                <div className = "card-container">
                    {tours.map(tour=>(
                        <BCard tour = {tour} key ={tour._id}/>
                    ))}
        </div>
            
        </div>
    )
} 

export default MyBookings;
import React,{useEffect,useState} from "react"
import {Link} from "react-router-dom"
import cookie from "js-cookie"
import axios from "axios"
import ReviewCard from "./reviewcard.component"

const MyReviews = ()=>{
    const [reviews,setReviews] = useState([])
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` }
    }
    useEffect(async()=>{
        try{
            const response = await axios.get("http://localhost:8000/api/reviews/userReviews",config)
            setReviews(response.data.reviews)
        }catch(err){
            alert(err.response.data.message)
        }
    },[])   
    return(
        <div className="user-view">
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
                <li>
                    <Link to="/myBookings">
                        <svg>
                        <use xlinkHref="/img/icons.svg#icon-briefcase"></use>
                        </svg>
                        My bookings
                    </Link>
                </li>
                <li className="side-nav--active">
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
                {reviews.map(review=> <ReviewCard review = {review}/>)}
            </div>
        </div>
    )
}

export default MyReviews;
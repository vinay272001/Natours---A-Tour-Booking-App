import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import cookie from "js-cookie"

const ReviewCard = (props)=>{
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` }
    }
    return(
        <div className="card">
            <div className="card__header">
                <div className="card__picture">
                    <div className="card__picture-overlay">&nbsp;</div>
                        <img
                            src={`/img/tours/${props.review.tour.imageCover}`}
                            alt="Tour 1"
                            className="card__picture-img"
                        />
                    </div>
                    <h3 className="heading-tertirary">
                        <span>{props.review.tour.name}</span>
                    </h3>
            </div>
            <div className="card__details">
                <p className="card__text">
                    {props.review.tour.summary}
                </p>
                <div className="card__data">
                    {props.review.review}
                </div>
                <div className="card__data">
                    {props.review.rating + "   ⭐"}
                </div>
            </div>
            <div className="card__footer">
                <p className = "btn btn--green" onClick = {async()=>{
                    try{
                        await axios.delete(`http://localhost:8000/api/reviews/${props.review._id}`,config)
                        window.location.reload()
                    }catch(err){
                        alert(err.response.data.message)
                    }
                }}>Delete Review</p>
            </div>
        </div>
    )   
}

export default ReviewCard
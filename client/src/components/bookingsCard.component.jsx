import React from "react"
import "../assets/css/style.css"
import {Link} from "react-router-dom"


const BCard = (props)=>{
    return(
    <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src={`/img/tours/${props.tour.imageCover}`}
                alt="Tour 1"
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>{props.tour.name}</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">{props.tour.difficulty} {props.tour.duration}-day tour</h4>
            <p className="card__text">
              {props.tour.summary}
            </p>
          </div>
          <div className="card__footer">
            <Link to={`/tours/${props.tour._id}/`} className = "btn btn--green btn--small">Details</Link>
            <Link to={`/addReview/${props.tour._id}`} className = "btn btn--green btn--small">Add a Review</Link>
          </div>
        </div>
)}

export default BCard;
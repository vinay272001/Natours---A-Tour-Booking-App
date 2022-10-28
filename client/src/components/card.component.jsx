import React from "react"
import "../assets/css/style.css"
import {Link} from "react-router-dom"

const getMonth = {
    1 : "Januray",
    2 : "February",
    3 : "March",
    4 : "April",
    5 : "May",
    6 : "June",
    7 : "July",
    8 : "August",
    9 : "September",
    10 : "October",
    11 : "November",
    12 : "December"
}

const Card = (props)=>{
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
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>{props.tour.startLocation.description}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-calendar"></use>
              </svg>
              <span>{getMonth[new Date(props.tour.startDates[0]).getMonth()]} {new Date(props.tour.startDates[0]).getFullYear()}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-flag"></use>
              </svg>
              <span>{props.tour.locations.length} stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-user"></use>
              </svg>
              <span>{props.tour.maxGroupSize} people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">${props.tour.price}</span>
              <span className="card__footer-text"> per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">{parseFloat(props.tour.ratingsAverage).toPrecision(2)}</span>
              <span className="card__footer-text"> Rating ({props.tour.ratingsQuantity} Reviews)</span>
            </p>
            <Link className = "btn btn--green" to={`/tours/${props.tour._id}`}>Details</Link>
          </div>
        </div>
)}

export default Card;
import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import "../assets/css/style.css"
import {useParams} from "react-router-dom"
import axios from "axios"
import Guide from "./tour-guide.component"
import cookie from "js-cookie"
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51IriYvSJxLErhjjpRLvI07UkP28FzwHehFJL6gzSDUgFSAEyQcKzYu2CIDmkdSufSYFLYpBOJ3iaW71WMdv7YX1200V55LoRrm")

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

const getReviewStars = (rating)=>{
    let stars = []
    for(let i=0;i<Math.round(rating);i++){
        stars.push("active")
    }
    let remain = 5 - stars.length
    for(let i=0;i<remain;i++){
        stars.push("inactive")
    }
    return(
        <React.Fragment>
            {stars.map(stat =>(
            <svg className={`reviews__star reviews__star--${stat}`}>
                <use xlinkHref="/img/icons.svg#icon-star"></use>
            </svg>
        ))}
        </React.Fragment>
    )
}

const reviewForm = ()=>(
    <div className = "section-reviews">
        <div className = "login-form">
            <h2 className ="heading-secondary ma-bt-lg">Leave a Review</h2>
        </div>
    </div>
)

const Tour = ()=>{
    const [tour,setTour] = useState({})
    const {id} = useParams()
    useEffect(async ()=>{
        const response = await axios.get(`http://localhost:8000/api/tours/${id}`)
        setTour(response.data.data)
    },[])
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` }
    }
    return (
        <React.Fragment>
            <section className="section-header">
            <div className="header__hero">
                <div className="header__hero-overlay">&nbsp;</div>
                    <img className="header__hero-img" src={`/img/tours/${tour.imageCover ? tour.imageCover : ""}`} alt="cover"/>
            </div>
                <div className="heading-box">
                    <h1 className="heading-primary">
                        <span>{tour.name ? tour.name : ""}</span>
                    </h1>
                    <div className="heading-box__group">
                        <div className="heading-box__detail">
                            <svg className="heading-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-clock"></use>
                            </svg>
                            <span className="heading-box__text">{tour.duration ? tour.duration : ""} days</span>
                        </div>
                         <div className="heading-box__detail">
                            <svg className="heading-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                            </svg>
                            <span className="heading-box__text">{(tour.startLocation && tour.startLocation.description) ? tour.startLocation.description : ""}</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-description">
                <div className="overview-box">
                    <div>
                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                        <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                            <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                        </svg>
                        <span className="overview-box__label">Next date</span>
                        <span className="overview-box__text">{tour.startDates ? getMonth[new Date(tour.startDates[0]).getMonth()] : ""} {tour.startDates ? new Date(tour.startDates[0]).getFullYear() : ""}</span>
                        </div>
                        <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                            <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                        </svg>
                        <span className="overview-box__label">Difficulty</span>
                        <span className="overview-box__text">{tour.difficulty ? tour.difficulty : ""}</span>
                        </div>
                        <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                            <use xlinkHref="/img/icons.svg#icon-user"></use>
                        </svg>
                        <span className="overview-box__label">Participants</span>
                        <span className="overview-box__text">{tour.maxGroupSize ? tour.maxGroupSize : ""} people</span>
                        </div>
                        <div className="overview-box__detail">
                        <svg className="overview-box__icon">
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                        </svg>
                        <span className="overview-box__label">Rating</span>
                        <span className="overview-box__text">{tour.ratingsAverage ? tour.ratingsAverage : "4.5"} / 5</span>
                        </div>
                    </div>

                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                        {tour.guides ? tour.guides.map(guide=>(<Guide guide = {guide} key = {guide._id}/>)) : ""}
                    </div>
                    </div>
                </div>

                <div className="description-box">
                    <h2 className="heading-secondary ma-bt-lg">About the {tour.name ? tour.name : ""}</h2>
                    <p className="description__text">
                    {tour.description ? tour.description : ""}
                    </p>
                    <p className="description__text">
                    {tour.summary ? tour.summary : ""}
                    </p>
                </div>
                </section>
                <section className = "section-pictures">
                    {tour.images ? (tour.images.map((img,num)=>(
                        <div className="picture-box">
                            <img
                                className={`picture-box__img picture-box__img--${num+1}`}
                                src={`/img/tours/${img}`}
                                alt="img"
                            />
                        </div>
                    ))) : ""}
                </section>
                <section className="section-reviews">
                    <div className="reviews">
                        {tour.reviews ? (tour.reviews.map(review =>(
                            <div className="reviews__card">
                                <div className="reviews__avatar">
                                    <img
                                        src={`/img/users/${review.user.photo}`}
                                        alt={`${review.user.name}`}
                                        className="reviews__avatar-img"
                                    />
                                    <h6 className="reviews__user">{review.user.name}</h6>
                                </div>
                                <p className="reviews__text">
                                    {review.review}
                                </p>
                                <div className="reviews__rating">
                                    {getReviewStars(review.rating)}
                                </div>
                            </div>
                        ))) : ""}
                    </div>
                </section>
                <section className="section-cta">
                    <div className="cta">
                        <div className="cta__img cta__img--logo">
                        <img src="/img/logo-white.png" alt="Natours logo" className="" />
                        </div>
                        <img src={tour.images ? `/img/tours/${tour.images[0]}`: ""} alt="" className="cta__img cta__img--1" />
                        <img src={tour.images ? `/img/tours/${tour.images[1]}`: ""} alt="" className="cta__img cta__img--2" />

                        <div className="cta__content">
                        <h2 className="heading-secondary">What are you waiting for?</h2>
                        <p className="cta__text">
                            {tour.duration ? tour.duration : ""} days. 1 adventure. Infinite memories. Make it yours today!
                        </p>
                        {cookie.get("jwt") ? <button onClick = {async ()=>{
                            try{
                                const stripe = await stripePromise
                                const session = await axios.get(`http://localhost:8000/api/bookings/checkout-session/${tour._id}`,config)
                                await stripe.redirectToCheckout({
                                    sessionId : session.data.session.id
                                })
                            }catch(err){
                                if(err.response){
                                    alert(err.response.data.message)
                                }else{
                                    alert(err)
                                }
                            }
                        }} className="btn btn--green span-all-rows">Book tour now!</button> : <Link to = "/login" className="btn btn--green span-all-rows">Log in to book Tour</Link>}
                        </div>
                    </div>
                </section>
        </React.Fragment>
    )
}

export default Tour;
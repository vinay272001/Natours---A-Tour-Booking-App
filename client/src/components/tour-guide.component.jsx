import React from "react"
import "../assets/css/style.css"


const Guide = (props)=>(
    <div className="overview-box__detail">
        <img
            src={`/img/users/${props.guide.photo}`}
            alt="photo"
            className="overview-box__img"
        />
        <span className="overview-box__label">{props.guide.role}</span>
        <span className="overview-box__text">{props.guide.name}</span>
    </div>
)

export default Guide;
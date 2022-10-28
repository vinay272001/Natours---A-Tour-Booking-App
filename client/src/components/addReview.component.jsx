import React,{useState} from "react"
import {useParams,Link} from "react-router-dom"
import axios from "axios"
import cookie from "js-cookie"

const AddReview = ()=>{
    const [rating,setRating] = useState(4.5)
    const [review,setReview] = useState("")
    const {tourId} = useParams()
    const token = cookie.get("jwt")
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return(
        <div className = "login-form">
            <h2 className ="heading-secondary ma-bt-lg">Write a Review</h2>
            <form className ="form form--login">
                <div className ="form__group"><label className ="form__label" htmlFor="review">Review</label>
                    <input className="form__input" id="review" type="text" required onChange={(event=>setReview(event.target.value))}/>
                </div>
                <div className ="form__group ma-bt-md"><label className ="form__label" htmlFor="rating">Rating</label>
                    <input className="form__input" id="review" type="number" min = "1" max = "5" step = "0.1" required onChange={(event=>setRating(event.target.value))}/>
                </div>
                <div className ="form__group">
                <Link to="/myBookings" className="btn btn--green" onClick = {async()=>{
                    try{
                        const response = await axios.post(`http://localhost:8000/api/tours/${tourId}/reviews`,{review,rating},config)
                    }catch(err){
                        alert(err)
                    }
                }}>Submit Review</Link>
                </div>
            </form>
        </div>
    )
}

export default AddReview
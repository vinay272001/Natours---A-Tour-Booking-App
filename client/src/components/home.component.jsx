import React,{useState,useEffect} from "react"
import "../assets/css/style.css"
import axios from "axios"
import Card from "./card.component"
import {useParams} from "react-router-dom"



const Home = ()=>{
    const {tourName} = useParams()
    const [tours,setTours] = useState([])
    useEffect(async ()=>{
        const name = tourName
        const URL = name ? `http://localhost:8000/api/tours/?slug=${name}` : "http://localhost:8000/api/tours/";
        const response = await axios.get(URL)   
        setTours(response.data.data);
    },[tourName])
    console.log(tours)
    return(
        <div className = "card-container">
            {tours.map(tour=>(
                <Card tour = {tour} key ={tour._id}/>
            ))}
        </div>
    )
}

export default Home
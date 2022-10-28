import React, { useState } from "react"
import "../assets/css/style.css"
import {Link} from "react-router-dom"
import cookies from "js-cookie"

const Navbar = ()=>{
    const [token,setToken] = useState(cookies.get("jwt"))
    const [name,setName] = useState(cookies.get("userName"))
    const [photo,setPhoto] = useState(cookies.get("userPhoto"))
    const [search,setSearch] = useState("")
    return(<header className = "header">
        <nav className = "nav nav--tours">
            <Link to="/" className="nav__el">Tours</Link>
            <form className="nav__search">
          <Link to = {`/home/${search}`}>
            <button className="nav__search-btn">
              <svg>
                <use xlinkHref="/img/icons.svg#icon-search"></use>
              </svg>
            </button>
          </Link>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
            onChange = {event => setSearch(event.target.value)}
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {token ? (
          <React.Fragment>
          <Link to="/me" className="nav__el">
          <img src={`/img/users/${photo}`} alt="user-image" className="nav__user-img" />
          <span>{name}</span>
          </Link>
          <Link to="/" className = "nav__el" onClick = {()=> {
                cookies.remove("jwt")
                cookies.remove("userName")
                cookies.remove("userPhoto")
                setToken(undefined);
                setName(undefined)
                setPhoto(undefined)
              }}>Log Out
          </Link>
          </React.Fragment>
        ) : <React.Fragment>
              <Link to="/login" className="nav__el">Log in</Link>
              <Link to="/signup" className="nav__el nav__el--cta" >Sign up</Link>
            </React.Fragment>}
      </nav>
    </header>)
}

export default Navbar
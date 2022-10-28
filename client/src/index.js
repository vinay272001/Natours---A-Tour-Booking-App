import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/css/style.css"
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Home from './components/home.component';
import Navbar from './components/navbar.component';
import Footer from './components/footer.component';
import Tour from './components/tour.component';
import Login from './components/login.component';
import Signup from './components/signup.component';
import EditUser from './components/editUser.component';
import ForgotPassword from './components/forgotPassword.component';
import Confirm from './components/bookingConfirmation';
import MyBookings from './components/myBookings.component';
import AddReview from "./components/addReview.component"
import MyReviews from './components/myReviews.component';

ReactDOM.render(
    <Router>
    <Navbar/>
      <div className = "main">
      <Switch>  
        <Route exact path = "/home">
          <Home />
        </Route>
        <Route exact path = "/home/:tourName">
          <Home />
        </Route>
        <Route exact path = "/tours/:id">
          <Tour/>
        </Route>
        <Route exact path = "/login">
          <Login/>
        </Route>
        <Route exact path = "/signUp">
          <Signup />
        </Route>
        <Route exact path = "/me">
          <EditUser />
        </Route>
        <Route exact path = "/forgotPassword">
          <ForgotPassword/>
        </Route>
        <Route exact path = "/confirmBooking/:tourId/:price">
          <Confirm/>
        </Route>
        <Route exact path = "/myBookings">
          <MyBookings/>
        </Route>
        <Route exact path = "/addReview/:tourId">
          <AddReview/>
        </Route>
        <Route exact path = "/myReviews">
          <MyReviews/>
        </Route>
        <Route exact path = "*">
          <Redirect to = "/home"/>
        </Route>
        </Switch>
      </div>
      <Footer/>
    </Router>,
  document.getElementById('root')
);

import { React, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Login from "./Login";
import Orders from "./Orders"
import { auth } from "./firebase";
//import { getAuth } from 'firebase/auth';
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";


const promise = loadStripe("pk_test_51Ppji1I28qGV6LObsgLZf6SuPcogCmh2NxNEQlNqmWYMye8YzPLgzuizaWJSrRINGNZ8eC6wTVLNW9JMVjtdKKAh00CgtaoXUk");

function App() {
  //use the data dispatched

  const [{}, dispatch] = useStateValue();

  

  //keeps track of who is signed
  useEffect(() => {
    //const auth = getAuth() //initialize auth
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Orders" element={
            <>
            <Header/>
            <Orders />
            </>
          } />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route 
            path="/payment"
            element={
              <>
              <Header/>
              <Elements stripe={promise}>
                <Payment />
              </Elements>
              
              </>
            
            }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

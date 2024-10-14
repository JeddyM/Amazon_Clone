import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider' 
import {db} from "./firebase";
import { collection, doc, orderBy, query, onSnapshot } from "firebase/firestore";//// Import Firestore modular functions
import Order from './Order';
import "./Orders.css";


function Orders() {

  const [{basket, user}, dispatch]= useStateValue();
  const[orders, setOrders]= useState([]);

  useEffect(() =>{
    if (user){
    
        // Reference to the user's orders collection
        const ordersRef = collection(db, "users", user?.uid, "orders");
        
        // Query to order by 'created' timestamp, descending
        const q = query(ordersRef, orderBy("created", "desc"));
  
        // Real-time listener using onSnapshot
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setOrders(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
  
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      } else {
        setOrders([]); // Clear orders if no user is logged in
      }

  }, [user])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className="orders_order">
        {orders?.map(order =>(
          <Order order={order}/>//passing a prop
        )

        )}
      </div>
    </div>
  )
}

export default Orders
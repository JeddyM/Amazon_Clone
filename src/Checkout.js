import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
//import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
//import Product from "./Product";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(basket);

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div className="checkout_title">Your Shopping Basket</div>
        <Subtotal />
        {basket.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>
      <div className="checkout_right"></div>
    </div>
  );
}

export default Checkout;

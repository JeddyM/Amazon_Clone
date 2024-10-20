import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{}, dispatch] = useStateValue();

  const removeFromBasket= () =>{
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id:id,
    })
  }
  return (
    <div className="CheckoutProduct">
      <img className='checkoutProduct__image' src={image} alt="Image"/>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton &&(
           <button onClick={removeFromBasket}>Remove from basket</button>
        )
       
        }
        
      </div>
    </div>
  );
}

export default CheckoutProduct;

import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";

function Payment() {
  const [{ basket, user }] = useStateValue();

  const navigate = useNavigate();

  //Payment button states
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState();
  const [processing, setProcessing] = useState();
  const [suceeded, setSuceeded] = useState();
  const [clientSecret, setClientSecret] = useState(true);

  const elements = useElements();
  const stripe = useStripe();

  //the useEffect hook enables us to get a new client secret
  //every time the basket changes to b able to charge the customer

  useEffect(() => {
    //generate the client secret (responsible for charging customer ) whenever basket changes
    const getClientSecret = async () => {
      const total = Math.round(getBasketTotal(basket) * 100); // Ensure total is an integer

      console.log("Total Amount:", total);

      try {
        const response = await axios({
          method: "post",
          url: `/payments/create?total=${total}`,
        });

        console.log("API Response:");

        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          console.error("Client Secret not found in response");
        }
      } catch (error) {
        console.error("Error getting client secret:", error);
        setError("Failed to get payment information. Please try again.");
      }
    };

    getClientSecret();
  }, [basket]);

  console.log("THE CLIENT SECRET IS>>", clientSecret);

  //functions
  const handleSubmit = async (event) => {
    //listen for changes in the cardElement
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        setSuceeded(true);
        setProcessing(false);
        setError(null);

        //swap to orders page
        navigate.replace("./orders");
      });
  };

  const handleChange = (event) => {
    //listens to changes on the card elememt and displays error
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length} items</Link>
        </h1>
        {/* Delivery Address*/}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>1679 Copper Lane</p>
            <p>Nairobi</p>
          </div>
        </div>
        {/* Review Items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
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
        </div>

        {/*Payment Method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || suceeded}>
                  <span>{processing ? <p>Processing</p> : "BUY"}</span>
                </button>

                {/*Handle errors */}
                {error && <div> {error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

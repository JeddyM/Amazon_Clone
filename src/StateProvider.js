import React, { createContext, useContext, useReducer } from "react";

// Creates a new context object 
export const StateContext = createContext();

/*Functional component with 3 props 
reducer: A function that describes how state should be updated based on actions.
initialState: The initial state of the application.
children: The child components that will be wrapped by this provider.
*/


//wrap our app and provide the Data layer
//This component acts as a provider for the context created earlier
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);


//Pull information from data layer
// access the state and dispatch function provided by the StateContext.Provider.
export const useStateValue = () => useContext(StateContext);
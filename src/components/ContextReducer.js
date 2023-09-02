import React, { createContext, useContext, useReducer } from "react";

const initialState = [];
const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
    default:
      console.log("error");
  }
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
}

export const useDispatch = () => useContext(cartDispatchContext);
export const useCart = () => useContext(cartStateContext);

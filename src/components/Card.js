import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./ContextReducer";

export default function Card(props) {
  let options = props.option;
  let priceOption = Object.keys(options);
  let dispatch = useDispatch();
  const priceref = useRef();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <div className="card mt-3" style={{ width: "17rem", maxHeight: "350px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "130px", objectFit: "fill" }}
        />
        <div className="card-body ">
          <h5 className="card-title ">{props.foodItem.name}</h5>
          <p className="card-text"></p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-secondary"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option value={i + 1} id={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-secondary"
              ref={priceref}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline fs-5 h-100">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-primary justify-content-center"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

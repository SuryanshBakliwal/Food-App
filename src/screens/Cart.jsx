import React from "react";
import { useCart, useDispatch } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let disptach = useDispatch();
  if (data.length === 0) {
    return (
      <>
        <div className="m-5 w-100 text-center fs-3"> The Cart Is Empty</div>
      </>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-md table-responsive-sm">
        <table className="table table-hover">
          <thead className="text-primary fs-5">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, idx) => {
              <tr>
                <th scope="row">{idx + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.npriceame}</td>
                <td>
                  {" "}
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => disptach({ type: "DELETE", index: idx })}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
        <div>
          <button className="btn btn-primary mt-5">Check Out</button>
        </div>
      </div>
    </div>
  );
}

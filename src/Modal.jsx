import React from "react";
import ReactDom from "react";
export default function Modal() {
  return ReactDom.createPortal(
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          backgroundColor: "darkviolet",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
          height: "90%",
          width: "90%",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "yellow",
            zIndex: "100",
          }}
        ></div>
      </div>
    </>,
    document.querySelectorById("cart-root")
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel1 from "../components/Carousel";
export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [search, setSearch] = useState("");
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    console.log(response[0], response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="">
          <div>
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
              style={{ objectFit: "fill", width: "100%" }}
            >
              <div className="carousel-inner" style={{ maxHeight: "600px" }}>
                <div className="carousel-caption" style={{ zIndex: "10" }}>
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    {/* <button type="button" class="btn btn-primary">
                      Search
                    </button> */}
                  </form>
                </div>
                <div className="carousel-item active">
                  <img
                    src="https://source.unsplash.com/random/900x700/?burger"
                    className="d-block w-100"
                    alt="..."
                    style={{
                      filter: "brightness(30%)",
                    }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://source.unsplash.com/random/900x700/?pizza"
                    className="d-block w-100"
                    alt="..."
                    style={{
                      filter: "brightness(30%)",
                    }}
                  />
                </div>
                <div className="carousel-item ">
                  <img
                    src="https://source.unsplash.com/random/900x700/?sandwich"
                    className="d-block w-100"
                    alt="..."
                    style={{
                      filter: "brightness(30%)",
                    }}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* <Carousel1 /> */}
        </div>
        <div className="container">
          {foodCat !== []
            ? foodCat.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItem !== []
                      ? foodItem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name
                                .toLowerCase()
                                .includes(search.toLocaleLowerCase())
                          )
                          .map((fooditem) => {
                            return (
                              <div
                                key={foodItem._id}
                                className="col-12 col-md-6 col-lg-3"
                              >
                                <Card
                                  foodItem={fooditem}
                                  option={fooditem.options[0]}
                                />
                              </div>
                            );
                          })
                      : ""}
                  </div>
                );
              })
            : ""}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

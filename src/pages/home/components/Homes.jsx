import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

import { Link } from "react-router-dom";
import Catagories from "../../catagories/components/Catagories";
import SmallLoading from "./../../../components/SmallLoading/SmallLoading";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState(categories);
  const [loading, setLoading] = useState(false);

  let component = true;
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/categories`);

    const response = await axios.get(
      `${import.meta.env.VITE_API}/products?page=1&limit=10`
    );

    if (component) {
      setFilter(response.products);
      console.log(response);
      console.log(data);
      setLoading(false);
    }

    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filterProduct = async (pro) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`
      );
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="buttons ">
          <button className=" cat-butt " onClick={() => setFilter("Men&#39;s fashion")}>
            Men&#39;s fashion
          </button>
          <button className=" cat-butt" onClick={() => filterProduct("Appliances")}>
            Appliances
          </button>
          <button
            className="cat-butt"
            onClick={() => filterProduct("Women&#39;s fashion")}
          >
            Women&#39;s fashion
          </button>
          <button className="cat-butt" onClick={() => filterProduct("Electronics")}>
            Electronics
          </button>
          <button
            className="cat-butt"
            onClick={() => filterProduct("laptops & accessories")}
          >
            laptops & accessories
          </button>
          <button className="cat-butt" onClick={() => filterProduct("Home & kitchen")}>
            Home & kitchen
          </button>
          <button className="cat-butt" onClick={() => filterProduct("ragrances")}>
            Fragrances
          </button>
          <button className="cat-butt" onClick={() => filterProduct("Beauty")}>
            Beauty
          </button>
        </div>

        <Catagories />
      </>
    );
  };

  return (
    <>
      <div className="rows">
        <div className="card text-white border-0 ">
          <img
            className="card-img"
            src="src\assets\background.jpg"
            alt="BackGround"
            height="550px"
          />
          <div className="card-img-overlay backGround ">
            <div className="containerCard ">
              <h5 className="card-title display-2 ">NEW SEASON ARRIVALS</h5>
              <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS!</p>
            </div>
          </div>
        </div>

        <div className="container productner my-5 py-5">
          <div className="row">
            <div className="coulmn mb-5">
              <h1 className="display-6 fw-bolder text-center">
                Latest Product
              </h1>
            </div>
          </div>
          <div className="productRow justify-content-center row">
            {loading ? <SmallLoading /> : <ShowProduct />}
          </div>
        </div>
      </div>
    </>
  );
}

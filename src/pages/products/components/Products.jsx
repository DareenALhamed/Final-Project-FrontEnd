import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { toast } from "react-toastify";
import SmallLoading from "../../../components/SmallLoading/SmallLoading";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/`);
      if (data.message == "success") {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <SmallLoading color="blue" size={100} />
      </div>
    );
  }

  return (
    <>
      <div className="products">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </>
  );
}

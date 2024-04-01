import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SmallLoading from "./../../../components/SmallLoading/SmallLoading";
import './Catagories.css'


export default function Catagories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/categories?limit=10`
      );

      if (data.message == "success") {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loader) {
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
      <div className="categories ">
        {categories.map((category) => (
          <div className="catContent ">
            <div className=" " key={category.id}>
              <img src={category.image.secure_url} alt={category.name} />
              <div className="card-body ">
                <Link 
                  to={`/categories/${category._id}`}
                  className="Link "
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>


      
    </>
  );
}

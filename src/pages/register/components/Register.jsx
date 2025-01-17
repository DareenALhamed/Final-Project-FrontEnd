import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import "./Register.css";

import { toast } from "react-toastify";

export default function Register() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: null,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handelImageChange = (e) => {
    const { name, files } = e.target;

    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const valiData = async () => {
    const RegisterSchema = object({
      userName: string().max(10).required("User name is required"),
      email: string().email("Invalid Email").required("Email is required"),
      password: string().min(6).required("Password is required"),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("Error registering", error.errors);
      setErrors(error.errors);
      setLoader(false);

      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validData = await valiData();
    console.log(validData);
    if (await valiData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUser({
          userName: "",
          email: "",
          password: "",
          image: null,
        });
        if (data.message == "success") {
          toast.success("Your account has been created SUCCESFULLY", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/Login");
        }
      } catch (error) {
        console.log(error);

        if (errors.response.data === 500) {
          toast.error(errors.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : null}
      <form onSubmit={handelSubmit}>
        <div className="login-wrap">
          <div className="login-html">
            <input
              id="tab-1"
              type="radio"
              name="tab"
              className="sign-in"
              defaultChecked=""
            />
            <label htmlFor="tab-1" className="tab">
              <Link to="/login" className="register">
                Sign In
              </Link>
            </label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" />
            <label htmlFor="tab-2" className="tab">
              Sign Up
            </label>
            <div className="login-form">
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    id="user"
                    type="text"
                    className="input"
                    onChange={handelChange}
                    name="userName"
                  />
                </div>

                <div className="group">
                  {/* <label htmlFor="pass" className="label">
                  Repeat Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={handelChange}
                /> */}
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Email Address
                  </label>
                  <input
                    id="pass"
                    type="text"
                    className="input"
                    name="email"
                    onChange={handelChange}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    onChange={handelChange}
                    name="password"
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="input"
                    name="image"
                    onChange={handelImageChange}
                  />
                </div>

                <div className="group">
                  <button className="signUp">
                    {!loader ? "Sign up" : "In progress"}
                  </button>
                </div>
                <div className="hr" />
                <div className="foot-lnk">
                  <label htmlFor="tab-1">
                    <Link to="/login" className="register">
                      Already Member?
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

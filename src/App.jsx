import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import Register from "./pages/register/components/Register";
import Home from "./pages/home/components/Homes.jsx";
import Cart from "./pages/Cart/components/Cart";
import Login from "./pages/login/components/Login.jsx";
import Catagories from "./pages/catagories/components/Catagories.jsx";
import CatagoryProducts from "./pages/catagories/components/CatagoryProducts";
import NotFound from "./components/NotFound";
import Products from "./pages/products/components/Products";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
//import { useState } from "react";
import UserContexProvider from "./contex/User";

export default function App() {
  // const [userName, setUserName] = useState("Dareen");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/product",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/categories/:id",
          element: <CatagoryProducts />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/Catagories",
          element: <Catagories />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <UserContexProvider>
        <RouterProvider router={router} />;
      </UserContexProvider>
      <ToastContainer />
    </>
  );
}

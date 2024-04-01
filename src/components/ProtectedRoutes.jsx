import { Navigate, useNavigate } from "react-router-dom"

export default function ProtectedRoutes({children}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if (!token) {
        return <Navigate to ='/Login' />;
    }
  return children;
}



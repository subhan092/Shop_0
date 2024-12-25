import { Navigate, useNavigate } from "react-router-dom";
import {getUserRole} from "../components/Jwt_decode";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const AdminProtectedroute = ({ children }) => {
  const { user , isAuthenticated , loading} = useSelector((state) => state.user);
  const role = getUserRole()
  console.log("user role",role)

  if(loading === true){
    return  <Loader/>
   }

  if(user && isAuthenticated){
    if(role === 'admin'){
      return children;
    }else if(role === 'user'){
      return  <Navigate to="/profile" replace/>;
    }
}
else{
    return  <Navigate to="/login" replace/>;
}

};

export default AdminProtectedroute;

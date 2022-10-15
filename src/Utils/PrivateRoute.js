import { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const PrivateRoute = () =>{
    let {user} = useContext(AuthContext)
     return(
        
        user&&user.is_super_admin?<Outlet/>:<Navigate replace to='/'></Navigate>
     )
}

export default PrivateRoute;
import { useAuthValue } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute =({children}) => {
    const {user} = useAuthValue()
    
    if(!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default PrivateRoute
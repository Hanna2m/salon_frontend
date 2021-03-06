import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
        // auth?.role?.find(role => allowedRole?.includes(role))
        //     ? <Outlet />
        //     : auth?.user
        //         ? <Navigate to="/" state={{ from: location }} replace />
        //         : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;
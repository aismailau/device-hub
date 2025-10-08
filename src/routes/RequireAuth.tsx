import { Navigate, Outlet, useLocation } from "react-router-dom";

import { authService } from "../services/authService";
import { AppRoute } from "./routes";

export const RequireAuth = () => {
    const location = useLocation();
    const token = authService.getSessionToken();

    if (!token) {
        return <Navigate to={AppRoute.Login} replace state={{ from: location }} />;
    }

    return <Outlet />;
};

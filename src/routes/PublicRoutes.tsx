import { Navigate, Outlet } from "react-router-dom";

import useCurrentUser from "../modules/auth/query/useCurrentUser";

const PublicRoute = () => {
    const { data } = useCurrentUser()
    if (data) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return <Outlet />;
};

export default PublicRoute;
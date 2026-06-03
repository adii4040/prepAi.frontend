import { Navigate, Outlet } from "react-router-dom";

import useCurrentUser from "../modules/auth/query/useCurrentUser";

const PublicRoute = () => {
    const { data, isLoading } = useCurrentUser();
    console.log('PublicRoute data:', data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
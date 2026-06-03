import { Navigate, Outlet } from "react-router-dom";

import useCurrentUser from "../modules/auth/query/useCurrentUser";

const PrivateRoute = () => {
    const { data, isLoading } = useCurrentUser();
    console.log('PrivateRoute data:', data);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};

export default PrivateRoute;
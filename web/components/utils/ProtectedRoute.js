// components/ProtectedRoute.js

import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { roleGET } from "api/user/role";
import { TokenManager } from 'util/token';
import Custom403 from 'page/403'
import LoadingScreen from 'ui/loadingScreen'


const DeniedPage = () => {
    return <Custom403/>;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const accessToken = Cookies.get('accessToken');

                TokenManager(refreshToken, accessToken);

                if (!accessToken) {
                    setIsLoading(false);
                    return;
                }

                const response = await roleGET(accessToken);
                console.log("ProtectedRoute response:", response.data)
                setUserRole(response.data.RID);
            } catch (error) {
                console.error("Error fetching user role:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (isLoading) {
        return <LoadingScreen/>;
    }

    if (!userRole) {
        return <Custom403 />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Custom403 />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

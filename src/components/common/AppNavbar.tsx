import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import AuthStorage from "../../services/AuthStorage";

const AppNavbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        AuthStorage.removeToken();
        AuthStorage.removeRoles();
        AuthStorage.removeUserId();

        setIsAuthenticated(false);

        navigate("/");
    };

    return (
        <div className="appNavbar">
            <Link to="/" className="logo">
                LOGO {/* Replace with real logo */}
            </Link>
            {isAuthenticated ? (
                <Link to="/" onClick={handleLogout} className="login">
                    Logout
                </Link>
            ) : (
                <Link to="/login" className="login">
                    Login
                </Link>
            )}
        </div>
    );
};


export default AppNavbar;
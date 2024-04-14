import {Link, useNavigate} from 'react-router-dom';
import AuthStorage from "../../services/AuthStorage";

const AppNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthStorage.removeToken();
        AuthStorage.removeRoles();
        AuthStorage.removeUserId();

        navigate("/");
    };

    return (
        <div className="appNavbar">
            <Link to="/" className="logo">
                LOGO {/* Replace with real logo */}
            </Link>
            { !AuthStorage.isAdmin()
                &&
                <Link to="/mentors" className="login">
                    Mentors
                </Link>
            }


            { AuthStorage.isAdmin()
                &&
                <>
                    <Link to="/mentors-monitor" className="login">
                        Mentors
                    </Link>
                    <Link to="/mentees-monitor" className="login">
                        Mentees
                    </Link>
                </>
            }

            { AuthStorage.isAuthenticated()
                &&
            <Link to="/applications" className="login">
                { AuthStorage.isAdmin() ? "Applications" : "My applications" }
            </Link>
            }

            { AuthStorage.isAuthenticated() ? (
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
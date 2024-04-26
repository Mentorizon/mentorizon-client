import {Link, useNavigate} from 'react-router-dom';
import AuthStorage from "../../services/AuthStorage";
// @ts-ignore
import logo from '../../assets/images/logo.png';
import {useState} from "react";
import ConfirmModal from './ConfirmModal';

const AppNavbar = () => {

    const navigate = useNavigate();

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleLogoutClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleLogoutConfirm = () => {
        AuthStorage.removeToken();
        AuthStorage.removeRoles();
        AuthStorage.removeUserId();

        navigate("/");
    };

    const handleClose = () => setShowConfirmModal(false);

    return (
        <div className="appNavbar">
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="Logo" style={{ width: '3.6rem', height: 'auto' }}/>
                </Link>
                { AuthStorage.isAuthenticated() && !AuthStorage.isAdmin()
                    &&
                    <Link to="/my-profile">
                        My profile
                    </Link>
                }

                {!AuthStorage.isAdmin()
                    &&
                    <Link to="/mentors">
                        Mentors
                    </Link>
                }

                { AuthStorage.isAdmin()
                    &&
                    <>
                        <Link to="/mentors-monitor">
                            Mentors
                        </Link>
                        <Link to="/mentees-monitor">
                            Mentees
                        </Link>
                    </>
                }

                { AuthStorage.isAuthenticated()
                    &&
                <Link to="/applications">
                    { AuthStorage.isAdmin() ? "Applications" : "My applications" }
                </Link>
                }
            </div>

            <div className="navbar-right">
                { AuthStorage.isAuthenticated() ? (
                    <>
                        <Link to="/" onClick={handleLogoutClick}>
                            Logout
                        </Link>

                        <ConfirmModal
                            show={showConfirmModal}
                            question="Are you sure you want to log out?"
                            handleClose={handleClose}
                            handleConfirm={handleLogoutConfirm}
                        />
                    </>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};


export default AppNavbar;
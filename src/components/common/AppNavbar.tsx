import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return (
        <div className="appNavbar">
            <Link to="/" className="logo">
                LOGO {/* TODO: Replace with your logo */}
            </Link>
            <Link to="/login" className="login">
                Login {/* TODO: Add login handler */}
            </Link>
        </div>
    )
}

export default AppNavbar;
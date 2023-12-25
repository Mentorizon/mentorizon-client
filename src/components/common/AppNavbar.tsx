import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="logo">
                LOGO {/* TODO: Replace with your logo */}
            </Link>
            <div className="login">Login</div> {/* TODO: Add login handler */}
        </div>
    )
}

export default AppNavbar;
import '../App.css';
import AppNavbar from "../components/common/AppNavbar";

const Home = () => {

    return (
        <div className="centered-content">
            <AppNavbar/>
            <h1>Mentorizon</h1>
            <p>By teaching, we learn. In learning, we teach.</p>
        </div>
    )
}

export default Home;
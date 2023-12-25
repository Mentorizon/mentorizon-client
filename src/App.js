import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useState} from "react";
import Home from "./pages/Home.tsx";
import LogIn from "./pages/LogIn";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<LogIn/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;

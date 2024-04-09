import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useState} from "react";
import Home from "./pages/Home.tsx";
import LogIn from "./pages/LogIn";
import SignUpMentee from "./pages/SignUpMentee";
import SignUpMentor from "./pages/SignUpMentor";
import MentorList from "./pages/MentorList";
import MentorApplication from "./pages/MentorApplication";
import Applications from "./pages/Applications";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<LogIn/>}></Route>
                <Route exact path="/signup-mentee" element={<SignUpMentee/>}></Route>
                <Route exact path="/apply-mentor" element={<SignUpMentor/>}></Route>
                <Route exact path="/mentors" element={<MentorList/>}></Route>
                <Route path="/apply/:mentorId" element={<MentorApplication />} />
                <Route path="/applications" element={<Applications />} />
            </Routes>
        </Router>
    );
}

export default App;

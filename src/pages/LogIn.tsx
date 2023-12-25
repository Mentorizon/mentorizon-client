import '../App.css';
import AppNavbar from "../components/common/AppNavbar";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import {useState} from "react";
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="loginPage">
            <AppNavbar/>
            <Container className="loginFormContainer">
                <Form className="loginForm">
                    {/*TODO: onSubmit={handleSubmit}*/}
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                        />
                    </FormGroup>

                    <div className="buttonGroup">
                        <Button type="submit" className="btn-custom">Login</Button>
                        <Button className="btn-custom btn-google">Login with Google</Button>
                    </div>
                </Form>
                <div className="accountOptions">
                    <div className="noAccount">Don't have an account?</div>
                    <div className="options">
                        <Link to="/signup-mentee" className="optionButton linkButton">
                            Sign up as a mentee
                        </Link>
                        <Link to="/apply-mentor" className="optionButton linkButton">
                            Apply to be a mentor
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LogIn;
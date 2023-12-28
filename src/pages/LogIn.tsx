import AppNavbar from "../components/common/AppNavbar";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import React, {useState} from "react";
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            autoComplete="password"
                        />
                    </FormGroup>

                    <div className="buttonGroup">
                        <Button type="submit" className="btn-custom">Log in</Button>
                        <Button className="btn-custom btn-google">Log in with Google</Button>
                    </div>
                </Form>
                <div className="accountOptions">
                    <div className="authSuggestion">Don't have an account?</div>
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
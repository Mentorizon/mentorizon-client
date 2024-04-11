import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Layout from "../components/common/Layout";
import {toast, ToastContainer} from "react-toastify";
import {jwtDecode} from 'jwt-decode';
import AuthStorage from "../services/AuthStorage";

interface DecodedToken {
    sub: string;
    userId: string;
    roles: string[];
    iat: number;
    exp: number;
}

const LogIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                toast.error(errorData || 'Invalid credentials.');
                return;
            }

            const data = await response.json();
            const decodedToken: DecodedToken =  jwtDecode(data.token);

            AuthStorage.setToken(data.token);
            AuthStorage.setUserId(decodedToken.userId);
            AuthStorage.setRoles(decodedToken.roles);

            navigate('/');
            toast.success('Login successful!');
        } catch (error) {
            toast.error('Login failed, please try again.');
        }
    };

    return (
        <Layout>
            <div className="loginPage">
                <Container className="loginFormContainer">
                    <Form className="loginForm" onSubmit={handleSubmit}>
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
                    <ToastContainer />
                </Container>
            </div>
        </Layout>
    )
}

export default LogIn;
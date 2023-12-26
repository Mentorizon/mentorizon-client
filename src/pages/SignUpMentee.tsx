import React, {useState} from "react";
import AppNavbar from "../components/common/AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

const SignUpMentee = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.length < 8) {
            alert("Password should contain at least 8 characters!")
        } else if (password !== repeatPassword) {
            alert("Passwords do not match!");
        }
    };

    const handleGoogleSignUp = () => {
        // Logic for signing up with Google
    };

    return (
        <div className="loginPage">
            <AppNavbar/>
            <Container className="loginFormContainer">
                <Form className="loginForm" onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            autoComplete="name"
                        />
                    </FormGroup>

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

                    <FormGroup>
                        <Label for="repeatPassword">Repeat password</Label>
                        <Input
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            required
                            value={repeatPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)}
                            autoComplete="repeatPassword"
                        />
                    </FormGroup>

                    <div className="buttonGroup">
                        <Button type="submit" className="btn-custom">
                            Sign up
                        </Button>
                        <Button type="button" className="btn-custom btn-google" onClick={handleGoogleSignUp}>
                            Sign up with Google
                        </Button>
                    </div>
                </Form>
                <div className="accountOptions">
                    <div className="options">
                        <div>
                            <div className="authSuggestion">Already have an account?</div>
                            <Link to="/login" className="optionButton linkButton">
                                Sign up as a mentee
                            </Link>
                        </div>

                        <div>
                            <div className="authSuggestion">Interested in becoming a mentor with us?</div>
                            <Link to="/apply-mentor" className="optionButton linkButton">
                                Apply to be a mentor
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SignUpMentee;
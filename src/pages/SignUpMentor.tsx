import React, { useState} from "react";
import AppNavbar from "../components/common/AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

const SignUpMentor = () => {
    const [name, setName] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [yearsOfExperience, setYearsOfExperience] = useState<number>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [contactInfo, setContactInfo] = useState<string>("");

    const getBase64 = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };


    const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setCvFile(file);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.length < 8) {
            alert("Password should contain at least 8 characters!")
        } else if (password !== repeatPassword) {
            alert("Passwords do not match!");
        }

        if (cvFile) {
            try {
                const cvBase64withPrefix = await getBase64(cvFile);
                const cvBase64 = cvBase64withPrefix.replace("data:application/pdf;base64,", "");
                console.log("cvBase64: " + cvBase64);
                const response = await fetch('http://localhost:8080/mentors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name, email, password, jobTitle, description, yearsOfExperience, cvBase64,
                        contactInfo}),
                });

                if (response.ok) {
                    alert("Mentor created successfully!");
                } else {
                    const errorData = await response.json();
                    alert(errorData.message);
                    console.log(errorData.message);
                }
            } catch (error) {
                console.error('Error in base64 conversion:', error);
            }
        }
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
                        <Label for="jobTitle">Job title</Label>
                        <Input
                            type="text"
                            name="jobTitle"
                            id="jobTitle"
                            required
                            maxLength={100}
                            value={jobTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Tell us about yourself</Label>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            required
                            minLength={10}
                            maxLength={200}
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="yearsOfExperience">Years of experience</Label>
                        <Input
                            type="number"
                            name="yearsOfExperience"
                            id="yearsOfExperience"
                            required
                            value={yearsOfExperience}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYearsOfExperience(Number(e.target.value))}
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
                            autoComplete="new-password"
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
                            autoComplete="new-password"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="cvFile">CV</Label>
                        <Input
                            type="file"
                            name="cvFile"
                            id="cvFile"
                            required
                            onChange={handleCvChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="contactInfo">Contact info (if not in CV)</Label>
                        <Input
                            type="text"
                            name="contactInfo"
                            id="contactInfo"
                            value={contactInfo}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(e.target.value)}
                            autoComplete="contactInfo"
                        />
                    </FormGroup>

                    <div className="buttonGroup">
                        <Button type="submit" className="btn-custom">Apply</Button>
                    </div>
                </Form>
                <div className="accountOptions">
                    <div className="options">
                        <div>
                            <div className="authSuggestion">Already have an account?</div>
                            <Link to="/login" className="optionButton linkButton">
                                Log in
                            </Link>
                        </div>

                        <div>
                            <div className="authSuggestion">Want to become a mentee?</div>
                            <Link to="/signup-mentee" className="optionButton linkButton">
                                Sign up as a mentee
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default SignUpMentor;
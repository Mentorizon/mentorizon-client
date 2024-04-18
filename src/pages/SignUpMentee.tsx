import React, {useState} from "react";
import AppNavbar from "../components/common/AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../components/common/Layout";
import { toast, ToastContainer } from 'react-toastify';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

type FieldErrors = {
    [K in keyof SignUpFormData]?: string;
};

type FieldValidationRule<T> = {
    validate: (value: any, formData: T) => boolean;
    message: string;
};

const validationRules: Record<keyof SignUpFormData, FieldValidationRule<SignUpFormData>> = {
    name: {
        validate: value => value.length >= 2,
        message: 'Name should contain at least 2 characters!',
    },
    email: {
        validate: value => /^\S+@\S+\.\S+$/.test(value),
        message: 'Email should be valid!',
    },
    password: {
        validate: value => value.length >= 8,
        message: 'Password should contain at least 8 characters!',
    },
    repeatPassword: {
        validate: (value, formData) => value === formData.password,
        message: 'Passwords do not match!',
    },
};

const SignUpMentee = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
    };

    const validateForm = (): boolean => {
        let isValid = true;
        let newFieldErrors: FieldErrors = {};

        (Object.keys(validationRules) as Array<keyof typeof validationRules>).forEach(field => {
            const { validate, message } = validationRules[field];
            if (!validate(formData[field], formData)) {
                isValid = false;
                newFieldErrors[field] = message;
                toast.error(message);
            }
        });

        setFieldErrors(newFieldErrors);

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.dismiss();

        if (!validateForm())
            return;

        try {
            const response = await fetch('http://localhost:8080/register/mentee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                toast.error(errorData);
            } else {
                toast.success('You have successfully registered!', {
                    autoClose: 3000,
                    onClose: () => {
                        navigate('/login');
                    },
                });
            }
        } catch (error) {
            toast.error('An error occurred while signing up.');
        }
    };

    const handleGoogleSignUp = () => {
        // Logic for signing up with Google
    };

    return (
        <Layout>
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
                                value={formData.name}
                                onChange={handleInputChange}
                                autoComplete="name"
                                required
                                className={fieldErrors.name ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                required
                                className={fieldErrors.email ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="password"
                                required
                                className={fieldErrors.password ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="repeatPassword">Repeat password</Label>
                            <Input
                                type="password"
                                name="repeatPassword"
                                id="repeatPassword"
                                value={formData.repeatPassword}
                                onChange={handleInputChange}
                                required
                                className={fieldErrors.repeatPassword ? 'incorrect-input' : ''}
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
                                    Log in
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
                    <ToastContainer />
                </Container>
            </div>
        </Layout>
    )
}

export default SignUpMentee;
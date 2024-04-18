import React, {ChangeEvent, useState} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import SelectDomain from "../components/feature-specific/SelectDomain";
import { Option } from "../types";
import Layout from "../components/common/Layout";
import { toast, ToastContainer } from "react-toastify";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    jobTitle: string;
    description: string;
    yearsOfExperience: number;
    cvFile: File | null;
    contactInfo: string;
    selectedDomainIds: string[];
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
        message: 'Your full name is too short!',
    },
    jobTitle: {
        validate: value => value.length >= 2,
        message: 'Your job title is too short!',
    },
    description: {
        validate: value => value.length >= 50,
        message: 'Your description should contain at least 50 characters!',
    },
    yearsOfExperience: {
        validate: value => value >= 0,
        message: 'Your years of experience should be a positive number!',
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
    selectedDomainIds: {
        validate: value => value.length > 0,
        message: 'At least one domain of expertise is required',
    },
    cvFile: {
        validate: value => value != null,
        message: 'CV file is required.',
    },
   contactInfo: {
       validate: () => true,
       message: ''
   }
};

const SignUpMentor = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        jobTitle: '',
        description: '',
        yearsOfExperience: 0,
        email: '',
        password: '',
        repeatPassword: '',
        cvFile: null,
        contactInfo: '',
        selectedDomainIds: [],
    });

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const navigate = useNavigate();

    const getBase64 = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleCvChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFormData({ ...formData, cvFile: event.target.files[0] });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'yearsOfExperience')
            setFormData({...formData, [name]: Number(value)});
        else
            setFormData({...formData, [name]: value});

        setFieldErrors({...fieldErrors, [name]: ''});
    };


    const handleDomainsChange = (selectedDomains: Option[]) => {
        const domainIds = selectedDomains.map(domain => domain.value);
        setFormData({ ...formData, selectedDomainIds: domainIds });
    };

    const validateForm = (): boolean => {
        let newFieldErrors: FieldErrors = {};
        let isValid = true;

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

        if (!validateForm())
            return;

        if (formData.cvFile) {
            try {
                const cvBase64withPrefix = await getBase64(formData.cvFile);
                const cvBase64 = cvBase64withPrefix.replace("data:application/pdf;base64,", "");
                console.log("cvBase64: " + cvBase64);
                const response = await fetch('http://localhost:8080/register/mentor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        jobTitle: formData.jobTitle,
                        description: formData.description,
                        yearsOfExperience: formData.yearsOfExperience,
                        domainIds: formData.selectedDomainIds,
                        cvBase64: cvBase64,
                        contactInfo: formData.contactInfo
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
        }
    };

    return (
        <Layout>
            <div className="loginPage">
                <Container className="loginFormContainer">
                    <Form className="loginForm" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Full Name</Label>
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
                            <Label for="jobTitle">Job title</Label>
                            <Input
                                type="text"
                                name="jobTitle"
                                id="jobTitle"
                                maxLength={100}
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                required
                                className={fieldErrors.jobTitle ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Tell us about yourself</Label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                value={formData.description}
                                onChange={e => setFormData({...formData, 'description': e.target.value})}
                                required
                                className={`textarea-custom ${fieldErrors.description ? 'incorrect-input' : ''}`}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="yearsOfExperience">Years of experience</Label>
                            <Input
                                type="number"
                                name="yearsOfExperience"
                                id="yearsOfExperience"
                                value={formData.yearsOfExperience}
                                onChange={handleInputChange}
                                required
                                className={fieldErrors.yearsOfExperience ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="domains">Domains of Expertise</Label>
                            <SelectDomain onDomainsChange={handleDomainsChange} />
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
                                autoComplete="new-password"
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
                                autoComplete="new-password"
                                required
                                className={fieldErrors.repeatPassword ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="cvFile">CV</Label>
                            <Input
                                type="file"
                                name="cvFile"
                                id="cvFile"
                                onChange={handleCvChange}
                                required
                                className={fieldErrors.cvFile ? 'incorrect-input' : ''}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="contactInfo">Contact info (if not in CV)</Label>
                            <Input
                                type="text"
                                name="contactInfo"
                                id="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                autoComplete="contactInfo"
                                className={fieldErrors.contactInfo ? 'incorrect-input' : ''}
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
                    <ToastContainer />
                </Container>
            </div>
        </Layout>
    );
}

export default SignUpMentor;
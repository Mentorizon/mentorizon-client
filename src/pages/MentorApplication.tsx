import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "../components/common/Layout";
import { toast, ToastContainer } from 'react-toastify';

type RouteParams = {
    mentorId: string;
};

interface MentorApplicationFormData {
    mentorId: string;
    menteeId: string;
    reason: string;
    motivation: string;
    selfDescription: string;
    currentSkills: string;
    goal: string;
}

type FieldErrors = {
    [K in keyof MentorApplicationFormData]?: boolean;
};

const fieldLabels: { [K in keyof MentorApplicationFormData]?: string } = {
    reason: "the reason for choosing this mentor",
    motivation: "your motivation for seeking mentorship",
    selfDescription: "a description about yourself",
    currentSkills: "your current level of expertise",
    goal: "your goals for this mentorship",
};

const MentorApplication: React.FC = () => {
    const { mentorId } = useParams<RouteParams>();
    const navigate = useNavigate();

    const [application, setApplication] = useState<MentorApplicationFormData>({
        mentorId: mentorId || '',
        menteeId: 'mentee-id',
        reason: '',
        motivation: '',
        selfDescription: '',
        currentSkills: '',
        goal: '',
    });

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setApplication({ ...application, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: false });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const minInputLengths = {
            reason: 20,
            motivation: 50,
            selfDescription: 20,
            currentSkills: 10,
            goal: 20,
        };

        let isFormValid = true;
        let errors: FieldErrors = {};
        Object.entries(minInputLengths).forEach(([key, minLength]) => {
            const fieldKey = key as keyof MentorApplicationFormData;

            if (application[fieldKey]?.length < minLength) {
                isFormValid = false;
                errors[fieldKey] = true; // Mark this field as having an error

                // Using fieldLabels with proper type assertion
                const errorMessage = `Please ensure ${fieldLabels[fieldKey]} is at least ${minLength} characters long.`;
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });

        setFieldErrors(errors);

        // Prevent submission if form is invalid
        if (!isFormValid) {
            return;
        }

        // TODO: Submit the application to the database
        console.log("Submitting application:", JSON.stringify(application));

        toast.success('Your application has been successfully submitted for review. Thank you!', {
            position: "top-right",
            autoClose: 3000,
            onClose: () => navigate("/mentors"),
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <Layout>
            <Container>
                <Row className="justify-content-center mentor-application-container">
                    <Col md="6">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="reason">Why did you choose this mentor?</Label>
                                <Input
                                    type="textarea"
                                    name="reason"
                                    id="reason"
                                    value={application.reason}
                                    onChange={handleChange}
                                    required
                                    className={fieldErrors.reason ? 'error' : ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="motivation">What motivates you to seek mentorship?</Label>
                                <Input
                                    type="textarea"
                                    name="motivation"
                                    id="motivation"
                                    value={application.motivation}
                                    onChange={handleChange}
                                    required
                                    className={fieldErrors.motivation ? 'error' : ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="currentSkills">What is your current level of expertise?</Label>
                                <Input
                                    type="textarea"
                                    name="currentSkills"
                                    id="currentSkills"
                                    value={application.currentSkills}
                                    onChange={handleChange}
                                    required
                                    className={fieldErrors.currentSkills ? 'error' : ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="goal">What are your goals for this mentorship?</Label>
                                <Input
                                    type="textarea"
                                    name="goal"
                                    id="goal"
                                    value={application.goal}
                                    onChange={handleChange}
                                    required
                                    className={fieldErrors.goal ? 'error' : ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="introduction">Tell us about yourself.</Label>
                                <Input
                                    type="textarea"
                                    name="selfDescription"
                                    id="selfDescription"
                                    value={application.selfDescription}
                                    onChange={handleChange}
                                    required
                                    className={fieldErrors.selfDescription ? 'error' : ''}
                                />
                            </FormGroup>

                            <div className="options mentor-application-buttons">
                                <Link to="/mentors" className="optionButton linkButton">
                                    Back to mentors
                                </Link>
                                <Button type="submit" color="primary" className="optionButton">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </Layout>
    );
};

export default MentorApplication;

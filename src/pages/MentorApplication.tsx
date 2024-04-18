import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "../components/common/Layout";
import { toast, ToastContainer } from 'react-toastify';
import AuthStorage from "../services/AuthStorage";

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
        menteeId: AuthStorage.getUserId() || '',
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

    const handleSubmit = async (event: React.FormEvent) => {
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
                errors[fieldKey] = true;

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

        if (!isFormValid)
            return;

        try {
            const response = await fetch('http://localhost:8080/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menteeId: application.menteeId,
                    mentorId: application.mentorId,
                    reason: application.reason,
                    motivation: application.motivation,
                    selfDescription: application.selfDescription,
                    currentSkills: application.currentSkills,
                    goal: application.goal,
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();

                switch(errorMessage) {
                    case 'You have already submitted an application to this mentor.':
                        toast.error(errorMessage);
                        break;
                    case 'You are already being mentored by this mentor.':
                        toast.error(errorMessage);
                        break;
                    default:
                        toast.error('An error occurred. Please try again.');
                }
                return;
            }

            toast.success('Your application has been successfully submitted for review. Thank you!', {
                position: 'top-right',
                autoClose: 3000,
                onClose: () => navigate('/mentors'),
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error: ' + error.message);
            } else {
                toast.error('An unexpected error occurred. Please try again.', {
                    position: 'top-right',
                    autoClose: 5000,
                });
                toast.error('An unexpected error occurred.');
            }
        }
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
                                    className={fieldErrors.reason ? 'incorrect-input' : ''}
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
                                    className={fieldErrors.motivation ? 'incorrect-input' : ''}
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
                                    className={fieldErrors.currentSkills ? 'incorrect-input' : ''}
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
                                    className={fieldErrors.goal ? 'incorrect-input' : ''}
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
                                    className={fieldErrors.selfDescription ? 'incorrect-input' : ''}
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

import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import Layout from "../components/common/Layout";

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

const MentorApplication: React.FC = () => {
    const { mentorId } = useParams<RouteParams>();

    const [application, setApplication] = useState<MentorApplicationFormData>({
        mentorId: mentorId || '',
        menteeId: 'mentee-id',
        reason: '',
        motivation: '',
        selfDescription: '',
        currentSkills: '',
        goal: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setApplication({ ...application, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const minInputLengths = {
            reason: 20,
            motivation: 20,
            selfDescription: 50,
            currentSkills: 20,
            goal: 20,
        };

        // Check if all inputs meet their minimum length requirement
        let isFormValid = true;
        Object.entries(minInputLengths).forEach(([key, minLength]) => {
            if (application[key as keyof MentorApplicationFormData].length < minLength) {
                isFormValid = false;
                console.error(`${key} needs to be at least ${minLength} characters long.`);
            }
        });

        // Prevent submission if form is invalid
        if (!isFormValid) {
            alert("Please fill out all fields correctly before submitting.");
            return;
        }

        // TODO: Submit the application to the database
        console.log("Submitting application:", JSON.stringify(application));
    };

    return (
        <Layout>
            <Container>
                <Row className="justify-content-center">
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
                                />
                            </FormGroup>

                            <div className="options">
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
            </Container>
        </Layout>
    );
};

export default MentorApplication;

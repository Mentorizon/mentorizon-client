import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import useApplicationActions from "../hooks/useApplicationsActions";
import ConfirmationButton from "../components/common/ConfirmationButton";
import {toast, ToastContainer} from "react-toastify";
import Layout from "../components/common/Layout";
import AuthStorage from "../services/AuthStorage";

interface Application {
    id: string;
    mentee: {
        name: string;
        email: string;
    };
    mentor: {
        name: string;
        email: string;
    };
    reason: string;
    motivation: string;
    selfDescription: string;
    currentSkills: string;
    goal: string;
    status: string;
}

const ApplicationDetailsPage = () => {
    const { id } = useParams();
    const [application, setApplication] = useState<Application | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { approveApplication, denyApplication, deleteApplication } = useApplicationActions();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrl = `http://localhost:8080/applications/${id}`;

        fetch(fetchUrl)
            .then((response) => response.json())
            .then((data) => {
                setApplication(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching application details:', error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div>Loading application details...</div>;
    }

    if (!application) {
        return <div>Application not found.</div>;
    }

    const handleApproveApplication = async () => {
        const success = await approveApplication(application.id);
        if (success) {
            toast.success('Application approved successfully.');
            setApplication(prev => prev ? {...prev, status: 'APPROVED'} : null);
        } else {
            toast.error('Failed to approve the application. Please try again.');
        }
    };

    const handleDenyApplication = async () => {
        const success = await denyApplication(application.id);
        if (success) {
            toast.success('Application denied successfully.');
            setApplication(prev => prev ? {...prev, status: 'DENIED'} : null);
        } else {
            toast.error('Failed to deny the application. Please try again.');
        }
    };

    const handleCancelApplication = async (applicationId: string) => {
        const success = await deleteApplication(applicationId);
        if (success) {
            toast.success('Application deleted successfully.');
            navigate('/applications');
        } else {
            toast.error('Failed to cancel the application. Please try again.');
        }
    };

    return (
        <Layout>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={8}>
                        <Card>
                            <CardHeader>
                                <h3>Application Details</h3>
                            </CardHeader>
                            <CardBody>
                                <h5>Mentee Information</h5>
                                <p>Name: {application.mentee.name}</p>
                                <p>Email: {application.mentee.email}</p>

                                <h5>Mentor Information</h5>
                                <p>Name: {application.mentor.name}</p>
                                { !AuthStorage.isMentee() || (AuthStorage.isMentee() && application.status === 'APPROVED') && (
                                    <p>Email: {application.mentor.email}</p>
                                )}
                                <h5>Application Content</h5>
                                <p>Reason for Applying: {application.reason}</p>
                                <p>Motivation: {application.motivation}</p>
                                <p>Self-Description: {application.selfDescription}</p>
                                <p>Current Skills: {application.currentSkills}</p>
                                <p>Goals: {application.goal}</p>
                                <p>Status: {application.status}</p>

                                { AuthStorage.isMentor() && application.status === 'PENDING' && (
                                    <>
                                        <ConfirmationButton
                                            onConfirm={() => handleApproveApplication()}
                                            buttonText="Approve"
                                            buttonColor="success"
                                            confirmText="Are you sure you want to approve this application?"
                                        />{' '}
                                        <ConfirmationButton
                                            onConfirm={() => handleDenyApplication()}
                                            buttonText="Deny"
                                            buttonColor="danger"
                                            confirmText="Are you sure you want to deny this application?"
                                        />{' '}
                                    </>
                                )}
                                { AuthStorage.isAdmin() && (
                                    <>
                                        <ConfirmationButton
                                            onConfirm={() => handleCancelApplication(application.id)}
                                            buttonText="Delete"
                                            buttonColor="danger"
                                            confirmText="Are you sure you want to delete this application?"
                                        />{' '}
                                    </>
                                )}
                                <Button color="secondary" tag={Link} to="/applications">Back to Applications</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer/>
            </Container>
        </Layout>
    );
};

export default ApplicationDetailsPage;

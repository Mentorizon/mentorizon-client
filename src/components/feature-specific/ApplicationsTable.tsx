import React from 'react';
import { Table, Button } from 'reactstrap';
import {useNavigate} from "react-router-dom";
import ConfirmationButton from "../common/ConfirmationButton";
import AuthStorage from "../../services/AuthStorage";

export interface Application {
    id: string;
    createdAt: string;
    updatedAt: string;
    mentee: User;
    mentor: User;
    reason: string;
    motivation: string;
    selfDescription: string;
    currentSkills: string;
    goal: string;
    status: 'PENDING' | 'APPROVED' | 'DENIED';
}

interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[];
    mentorDetails?: MentorDetails;
}

interface Role {
    name: string;
}

interface MentorDetails {
    jobTitle: string;
    cvName: string;
    description: string;
    yearsOfExperience: number;
    domains: Domain[];
    rating: number;
    approved: boolean;
}

interface Domain {
    id: string;
    name: string;
}


type ApplicationRowProps = {
    application: Application;
    handleApproveApplication: (applicationId: string) => void;
    handleDenyApplication: (applicationId: string) => void;
    handleCancelApplication: (applicationId: string) => void;
};

const ApplicationRow: React.FC<ApplicationRowProps> = ({
                                                           application,
                                                           handleApproveApplication,
                                                           handleDenyApplication,
                                                           handleCancelApplication,
                                                       }) => {
    const reviewedAt = application.createdAt !== application.updatedAt
        ? new Date(application.updatedAt).toLocaleString()
        : '';
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/applications/${application.id}`);
    };

    return (
        <tr>
            <td>{application.mentee.name}</td>
            <td>{application.mentor.name}</td>
            <td>{application.status}</td>
            <td>{new Date(application.createdAt).toLocaleString()}</td>
            <td>{reviewedAt}</td>
            <td>
                { AuthStorage.isMentor() && application.status === 'PENDING' && (
                    <>
                        <ConfirmationButton
                            onConfirm={() => handleApproveApplication(application.id)}
                            buttonText="Approve"
                            buttonColor="success"
                            confirmText="Are you sure you want to approve this application?"
                        />{' '}
                        <ConfirmationButton
                            onConfirm={() => handleDenyApplication(application.id)}
                            buttonText="Deny"
                            buttonColor="danger"
                            confirmText="Are you sure you want to deny this application?"
                        />{' '}
                    </>
                )}

                <>
                    <Button color="secondary" onClick={handleReadMore}>Read More</Button>{' '}
                </>

                { ((AuthStorage.isMentee() && application.status === 'PENDING') || AuthStorage.isAdmin()) && (
                    <ConfirmationButton
                        onConfirm={() => handleCancelApplication(application.id)}
                        buttonText={`${AuthStorage.isMentee() ? "Cancel" : "Delete"}`}
                        buttonColor="danger"
                        confirmText={`Are you sure you want to ${AuthStorage.isMentee() ? "cancel" : "delete"} this application?`}
                    />
                )}
            </td>
        </tr>
    );
}


type ApplicationsTableProps = {
    applications: Application[];
    handleApproveApplication: (applicationId: string) => void;
    handleDenyApplication: (applicationId: string) => void;
    handleCancelApplication: (applicationId: string) => void;
};

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
                                                                 applications,
                                                                 handleApproveApplication,
                                                                 handleDenyApplication,
                                                                 handleCancelApplication,
                                                             }) => {
    return (
        <div className="table-responsive">
            <Table striped className="applications-table">
                <thead>
                <tr>
                    <th className="mentee-column">Mentee</th>
                    <th className="mentor-column">Mentor</th>
                    <th className="status-column">Status</th>
                    <th className="created-column">Created At</th>
                    <th className="updated-column">Reviewed At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {applications.map((application) => (
                    <ApplicationRow
                        key={application.id}
                        application={application}
                        handleApproveApplication={handleApproveApplication}
                        handleDenyApplication={handleDenyApplication}
                        handleCancelApplication={handleCancelApplication}
                    />
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ApplicationsTable;
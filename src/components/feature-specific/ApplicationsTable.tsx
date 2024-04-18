import React, {FC, useState} from 'react';
import { Table, Button } from 'reactstrap';
import {useNavigate} from "react-router-dom";
import ConfirmationButton from "../common/ConfirmationButton";

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
    role: string;
    handleApproveApplication: (applicationId: string) => void;
    handleDenyApplication: (applicationId: string) => void;
    handleCancelApplication: (applicationId: string) => void;
};

const ApplicationRow: React.FC<ApplicationRowProps> = ({
                                                           application,
                                                           role,
                                                           handleApproveApplication,
                                                           handleDenyApplication,
                                                           handleCancelApplication,
                                                       }) => {
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
            <td>{new Date(application.updatedAt).toLocaleString()}</td>
            {role === 'mentor' && (
                <td>
                    {application.status === 'PENDING' && (
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
                    <Button color="secondary" onClick={handleReadMore}>Read More</Button>
                </td>
            )}
            {role === 'mentee' && (
                <td>
                    {application.status === 'PENDING' && (
                        <ConfirmationButton
                            onConfirm={() => handleCancelApplication(application.id)}
                            buttonText="Cancel"
                            buttonColor="danger"
                            confirmText="Are you sure you want to cancel this application?"
                        />
                    )}
                </td>
            )}

        </tr>
    );
}


type ApplicationsTableProps = {
    applications: Application[];
    role: string;
    handleApproveApplication: (applicationId: string) => void;
    handleDenyApplication: (applicationId: string) => void;
    handleCancelApplication: (applicationId: string) => void;
};

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
                                                                 applications,
                                                                 role,
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
                    <th className="updated-column">Updated At</th>
                    {role !== 'admin' && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {applications.map((application) => (
                    <ApplicationRow
                        key={application.id}
                        application={application}
                        role={role}
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
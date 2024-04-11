import React from 'react';
import { Table, Button } from 'reactstrap';

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
    handleApprove: (applicationId: string) => void;
    handleDeny: (applicationId: string) => void;
    handleDelete?: (applicationId: string) => void;
};

const ApplicationRow: React.FC<ApplicationRowProps> = ({
                                                           application,
                                                           role,
                                                           handleApprove,
                                                           handleDeny,
                                                           handleDelete,
                                                       }) => {
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
                            <Button color="success" onClick={() => handleApprove(application.id)}>Approve</Button>{' '}
                            <Button color="danger" onClick={() => handleDeny(application.id)}>Deny</Button>
                        </>
                    )}
                </td>
            )}
            {role === 'mentee' && (
                <td>
                    <Button color="danger" onClick={() => handleDelete && handleDelete(application.id)}>Delete</Button>
                </td>
            )}
        </tr>
    );
}


type ApplicationsTableProps = {
    applications: Application[];
    role: string;
    handleApprove: (applicationId: string) => void;
    handleDeny: (applicationId: string) => void;
    handleDelete?: (applicationId: string) => void;
};

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
                                                                 applications,
                                                                 role,
                                                                 handleApprove,
                                                                 handleDeny,
                                                                 handleDelete,
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
                        handleApprove={handleApprove}
                        handleDeny={handleDeny}
                        handleDelete={handleDelete}
                    />
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ApplicationsTable;
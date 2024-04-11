import React, {useState} from 'react';
import { Table, Button } from 'reactstrap';
import ConfirmModal from "../common/ConfirmModal";

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
    const [modalShow, setModalShow] = useState(false);
    const [intendedAction, setIntendedAction] = useState<'approve' | 'deny' | 'cancel' | null>(null);

    const handleOpenApproveModal = () => {
        setIntendedAction('approve');
        setModalShow(true);
    };

    const handleOpenDenyModal = () => {
        setIntendedAction('deny');
        setModalShow(true);
    };

    const handleOpenCancelModal = () => {
        setIntendedAction('cancel');
        setModalShow(true);
    };

    const handleConfirmAction = () => {
        handleCloseModal();
        if (intendedAction === 'approve') {
            handleApprove && handleApprove(application.id);
        } else if (intendedAction === 'deny') {
            handleDeny && handleDeny(application.id);
        } else if (intendedAction === 'cancel') {
            handleDelete && handleDelete(application.id);
        }
        setIntendedAction(null);
    };
    const handleCloseModal = () => setModalShow(false);

    const handleConfirmCancellingApplication = () => {
        handleCloseModal();
        handleDelete && handleDelete(application.id);
    };

    const handleConfirmApprovingApplication = () => {
        handleCloseModal();
        handleApprove && handleApprove(application.id);
    };

    const handleConfirmDenyingApplication = () => {
        handleCloseModal();
        handleDeny && handleDeny(application.id);
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
                            <Button color="success" onClick={handleOpenApproveModal}>Approve</Button>{' '}
                            <Button color="danger" onClick={handleOpenDenyModal}>Deny</Button>
                        </>
                    )}
                </td>
            )}
            {role === 'mentee' && (
                <td>
                    <Button color="danger" onClick={handleOpenCancelModal}>Cancel</Button>
                </td>
            )}
            <ConfirmModal
                show={modalShow}
                question={
                    intendedAction === 'approve'
                        ? "Are you sure you want to approve this application?"
                        : intendedAction === 'deny'
                            ? "Are you sure you want to deny this application?"
                            : "Are you sure you want to cancel your application?"
                }
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmAction}
            />
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
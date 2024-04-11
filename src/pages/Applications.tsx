import React, { useState, useEffect } from 'react';
import ApplicationsTable, { Application } from '../components/feature-specific/ApplicationsTable';
import AppNavbar from "../components/common/AppNavbar";
import AuthStorage from "../services/AuthStorage";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";

type ApplicationsPageProps = {
    userRole: 'admin' | 'mentor' | 'mentee';
    userId: string;
};

const ApplicationsPage: React.FC<ApplicationsPageProps> = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const userRole = AuthStorage.isAdmin() ? 'admin' : (AuthStorage.isMentor() ? 'mentor' : 'mentee');
    const userId = AuthStorage.getUserId();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const baseUrl = 'http://localhost:8080/applications'
        const fetchUrl = userRole === 'admin'
            ? baseUrl
            : baseUrl + `?${userRole}Id=${userId}`;

        fetch(fetchUrl)
            .then((response) => response.json())
            .then((data) => {
                setApplications(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching applications:', error);
                setIsLoading(false);
            });
    }, [userRole, userId]);

    const handleApprove = async (applicationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`,
                },
                body: JSON.stringify({ status: 'APPROVED' }),
            });

            if (response.ok) {
                const updatedApplications = applications.map(app =>
                    app.id === applicationId ? { ...app, status: 'APPROVED' as 'APPROVED' } : app
                );
                setApplications(updatedApplications);
                toast.success('Application approved successfully.');
            } else {
                toast.error('Failed to approve the application. Please try again.');
            }
        } catch (error) {
            console.error('Error approving application:', error);
            toast.error('An error occurred while approving the application. Please try again.');
        }
    };

    const handleDeny = async (applicationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`,
                },
                body: JSON.stringify({ status: 'DENIED' }),
            });

            if (response.ok) {
                const updatedApplications = applications.map(app =>
                    app.id === applicationId ? { ...app, status: 'DENIED' as 'DENIED' } : app
                );
                setApplications(updatedApplications);
                toast.success('Application denied successfully.');
            } else {
                toast.error('Failed to deny the application. Please try again.');
            }
        } catch (error) {
            console.error('Error denying application:', error);
            toast.error('An error occurred while denying the application. Please try again.');
        }
    };

    const handleDelete = async (applicationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/applications/${applicationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`,
                },
            });

            if (response.ok) {
                setApplications(applications.filter(application => application.id !== applicationId));
                toast.success('Your application has been successfully canceled.');
            } else {
                toast.error('Failed to cancel the application. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting application:', error);
            toast.error('An error occurred while trying to cancel the application. Please try again.');
        }
    };

    return (
        <div>
            <AppNavbar/>
            {isLoading ? (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>Loading applications...</h1>
                    </div>
                </div>
            ) : applications.length > 0 ? (
                <ApplicationsTable
                    applications={applications}
                    role={userRole}
                    handleApprove={handleApprove}
                    handleDeny={handleDeny}
                    handleDelete={userRole === 'mentee' ? handleDelete : undefined}
                />
            ) : (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>You currently have no applications.</h1>
                        <h1>Visit the <Link to="/mentors">Mentors</Link> page to find and apply for mentorship.</h1>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
    );

};

export default ApplicationsPage;

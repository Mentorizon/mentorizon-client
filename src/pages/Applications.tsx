import React, { useState, useEffect } from 'react';
import ApplicationsTable, { Application } from '../components/feature-specific/ApplicationsTable';
import AuthStorage from "../services/AuthStorage";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import useApplicationsActions from "../hooks/useApplicationsActions";
import Layout from "../components/common/Layout";


const ApplicationsPage: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const userRole = AuthStorage.isAdmin() ? 'admin' : (AuthStorage.isMentor() ? 'mentor' : 'mentee');
    const userId = AuthStorage.getUserId();
    const [isLoading, setIsLoading] = useState(true);
    const { approveApplication, denyApplication, deleteApplication } = useApplicationsActions();

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

    const handleApproveApplication = async (applicationId: string) => {
        const success = await approveApplication(applicationId);
        if (success) {
            toast.success('Application approved successfully.');
            const updatedApplications = applications.map(app =>
                app.id === applicationId ? { ...app, status: 'APPROVED' as 'APPROVED' } : app
            );
            setApplications(updatedApplications);
        } else {
            toast.error('Failed to approve the application. Please try again.');
        }
    };

    const handleDenyApplication = async (applicationId: string) => {
        const success = await denyApplication(applicationId);
        if (success) {
            toast.success('Application denied successfully.');
            const updatedApplications = applications.map(app =>
                app.id === applicationId ? { ...app, status: 'DENIED' as 'DENIED' } : app
            );
            setApplications(updatedApplications);
        } else {
            toast.error('Failed to deny the application. Please try again.');
        }
    };

    const handleCancelApplication = async (applicationId: string) => {
        const success = await deleteApplication(applicationId);
        if (success) {
            toast.success('Application cancelled successfully.');
            setApplications(applications.filter(application => application.id !== applicationId));
        } else {
            toast.error('Failed to cancel the application. Please try again.');
        }
    };


    return (
        <Layout>
            { isLoading ? (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>Loading applications...</h1>
                    </div>
                </div>
            ) : applications.length > 0 ? (
                <ApplicationsTable
                    applications={applications}
                    handleApproveApplication={handleApproveApplication}
                    handleDenyApplication={handleDenyApplication}
                    handleCancelApplication={handleCancelApplication}
                />
            ) : (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        { AuthStorage.isAdmin()
                            ? <h1>There are currently no applications.</h1>
                            : AuthStorage.isMentor()
                                ? <h1>There are no current applications. This could be a great time to update your mentor profile to attract mentees or check out some resources on how to be an effective mentor.</h1>
                                : <>
                                    <h1>It looks like you haven't applied for mentorship yet.</h1>
                                    <h1>Explore our <Link to="/mentors">Mentors</Link> page to connect with someone who can guide you on your journey.</h1>
                                </>
                        }

                    </div>
                </div>
            )}
            <ToastContainer/>
        </Layout>
    );

};

export default ApplicationsPage;

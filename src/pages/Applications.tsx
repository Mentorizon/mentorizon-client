import React, { useState, useEffect } from 'react';
import ApplicationsTable, { Application } from '../components/feature-specific/ApplicationsTable';
import AppNavbar from "../components/common/AppNavbar";

type ApplicationsPageProps = {
    userRole: 'admin' | 'mentor' | 'mentee';
    userId: string;
};

const ApplicationsPage: React.FC<ApplicationsPageProps> = ({ userRole, userId }) => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        const baseUrl = 'http://localhost:8080/applications'
        const fetchUrl = userRole === 'admin'
            ? baseUrl
            : baseUrl + `?${userRole}Id=${userId}`;

        fetch(fetchUrl)
            .then((response) => response.json())
            .then((data) => setApplications(data))
            .catch((error) => console.error('Error fetching applications:', error));
    }, [userRole, userId]);

    const handleApprove = (applicationId: string) => {

    };

    const handleDeny = (applicationId: string) => {

    };

    const handleDelete = (applicationId: string) => {

    };

    return (
        <div>
            <AppNavbar/>
            <ApplicationsTable
                applications={applications}
                role={userRole}
                handleApprove={handleApprove}
                handleDeny={handleDeny}
                handleDelete={userRole === 'mentee' ? handleDelete : undefined}
            />
        </div>
    );
};

export default ApplicationsPage;

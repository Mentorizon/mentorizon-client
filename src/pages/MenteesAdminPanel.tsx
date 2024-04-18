import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../components/common/Layout';

export type Mentee = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

const MenteesAdminPanel: React.FC = () => {
    const [mentees, setMentees] = useState<Mentee[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/mentees')
            .then(response => response.json())
            .then(data => {
                setMentees(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching mentees:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <Layout>
            <ToastContainer />
            {isLoading ? (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>Loading mentees...</h1>
                    </div>
                </div>
            ) : mentees.length > 0 ? (
                <div className="table-responsive">
                    <Table striped className="applications-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mentees.map(mentee => (
                            <tr key={mentee.id}>
                                <td>{mentee.name}</td>
                                <td>{mentee.email}</td>
                                <td>{new Date(mentee.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>No mentees found.</h1>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default MenteesAdminPanel;

import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import {toast, ToastContainer} from "react-toastify";
import Layout from '../components/common/Layout';

export type Mentor = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    jobTitle: string;
    description: string;
    yearsOfExperience: number;
    domains: string[];
    cv: string;
    contactInfo: string;
    rating: number;
    approved: boolean;
};

const MentorsAdminPanel: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/mentors')
            .then(response => response.json())
            .then(data => {
                setMentors(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching mentors:', error);
                setIsLoading(false);
            });
    }, []);

    const handleApprove = async (mentorId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/mentors/${mentorId}/approve`, { method: 'PUT' });
            if (response.ok) {
                toast.success('Mentor approved successfully.');
                setMentors(prevMentors => prevMentors.map(mentor => {
                    if (mentor.id === mentorId) {
                        return { ...mentor, approved: true };
                    }
                    return mentor;
                }));
            } else {
                toast.error('Failed to approve the mentor. Please try again.');
            }
        } catch (error) {
            console.error('Error approving mentor:', error);
            toast.error('An error occurred while approving the mentor. Please try again.');
        }
    };

    return (
        <Layout>
            <ToastContainer />
            {isLoading ? (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>Loading mentors...</h1>
                    </div>
                </div>
            ) : mentors.length > 0 ? (
                <div className="table-responsive">
                    <Table striped className="applications-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Job Title</th>
                            <th>Description</th>
                            <th>Years of Experience</th>
                            <th>Domains</th>
                            <th>CV</th>
                            <th>Contact Info</th>
                            <th>Is Approved?</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mentors.map(mentor => (
                            <tr key={mentor.id}>
                                <td>{mentor.name}</td>
                                <td>{mentor.email}</td>
                                <td>{new Date(mentor.createdAt).toLocaleString()}</td>
                                <td>{mentor.jobTitle}</td>
                                <td>{mentor.description}</td>
                                <td>{mentor.yearsOfExperience}</td>
                                <td>{mentor.domains.join(', ')}</td>
                                <td>cv якось треба</td>
                                <td>{mentor.contactInfo}</td>
                                <td>{mentor.approved ? "Так" : "Ні"}</td>
                                <td>
                                    {!mentor.approved &&
                                        <Button color="success" onClick={() => handleApprove(mentor.id)}>
                                            Approve
                                        </Button>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="full-screen-message-wrapper">
                    <div className="full-screen-message">
                        <h1>No mentors found.</h1>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default MentorsAdminPanel;

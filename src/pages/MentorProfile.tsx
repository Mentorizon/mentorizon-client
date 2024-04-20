import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Mentor, Domain} from '../types';
import Layout from "../components/common/Layout";
import StarRating from "../components/feature-specific/StarRating";
import {ToastContainer} from "react-toastify";

const MentorProfile: React.FC = () => {
    const { mentorId } = useParams();
    const navigate = useNavigate();
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleApplyClick = () => navigate(`/apply/${mentorId}`);

    useEffect(() => {
        const fetchMentorDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/mentors/${mentorId}`);
                if (response.ok) {
                    const data: Mentor = await response.json();
                    setMentor(data);
                } else {
                    console.error('Failed to fetch mentor details');
                }
            } catch (error) {
                console.error('Error fetching mentor details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentorDetails();
    }, [mentorId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!mentor) {
        return <div>Mentor not found</div>;
    }

    return (
        <Layout>
            <div className="mentor-profile-wrapper">
                <div className="mentor-profile">
                    <div className="mentor-profile-header">
                        <h3 className="center-text">{mentor.name}</h3>
                        <p className="center-text">{mentor.jobTitle}</p>
                        <div className="experience-rating-row">
                            <p className="years-experience">{mentor.yearsOfExperience} years</p>
                            <div className="mentor-rating mentor-profile-rating">
                                <StarRating
                                    mentorId={mentor.id}
                                    currentRating={Math.round(mentor.rating)}
                                    currentRatingsNumber={mentor.ratingsNumber}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mentor-profile-description">
                        <div className="mentor-profile-domains">
                            {mentor.domains.map((domain: Domain, index: number) => (
                                <span key={index} className="domain">{domain.name}</span>
                            ))}
                        </div>
                        <p>{mentor.description}</p>
                    </div>
                    <div className="mentor-footer">
                        <button className="apply" onClick={handleApplyClick}>Apply</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </Layout>
    );
};

export default MentorProfile;

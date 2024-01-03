import React, { useState, useEffect } from 'react';
import MentorCard from '../components/feature-specific/MentorCard';
import AppNavbar from '../components/common/AppNavbar';
import { Mentor } from '../types';

const MentorListPage: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);

    const fetchMentors = async () => {
        const response = await fetch(`http://localhost:8080/mentors`);
        const data = await response.json();
        setMentors(data);
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    return (
        <div className="mentor-list-page">
            <AppNavbar />
            <div className="mentor-list-container">
                {mentors.map((mentor: Mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </div>
    );
};

export default MentorListPage;

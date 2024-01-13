import React, { useState, useEffect } from 'react';
import MentorCard from '../components/feature-specific/MentorCard';
import { Mentor } from '../types';
import MentorFilters from "../components/feature-specific/MentorFilters";
import Layout from "../components/common/Layout";

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

    const handleFilterChange = () => {

    }

    return (
        <Layout>
            <div className="mentor-list-page">
                <MentorFilters onFilterChange={handleFilterChange}/>
                <div className="mentor-list-container">
                    {mentors.map((mentor: Mentor) => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default MentorListPage;

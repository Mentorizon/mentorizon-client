import React, { useState, useEffect } from 'react';
import MentorCard from '../components/feature-specific/MentorCard';
import { Mentor } from '../types';
import MentorFilters from "../components/feature-specific/MentorFilters";
import Layout from "../components/common/Layout";
import {MultiValue} from "react-select";

interface DomainOption {
    value: string;
    label: string;
}

const MentorListPage: React.FC = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);

    const fetchMentors = async (queryString = '') => {
        const response = await fetch(`http://localhost:8080/mentors${queryString}`);
        const data = await response.json();
        setMentors(data);
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleFilterChange = (filters: {
        selectedDomains: MultiValue<DomainOption>;
        minYearsOfExperience: number;
        minRating: number;
    }) => {
        const queryParams = new URLSearchParams();

        filters.selectedDomains.forEach((domain: { value: string; }) => {
            if (domain && domain.value)
                queryParams.append('domains', domain.value);
        });

        if (filters.minYearsOfExperience > 0)
            queryParams.set('yearsOfExperience', filters.minYearsOfExperience.toString());

        if (filters.minRating > 0)
            queryParams.set('rating', filters.minRating.toString());

        fetchMentors(`?${queryParams.toString()}`);
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

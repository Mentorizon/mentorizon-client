import React, { useState, useEffect } from 'react';
import Select, { MultiValue } from 'react-select';

interface DomainOption {
    value: string;
    label: string;
}

interface FiltersProps {
    onFilterChange: (filters: {
        selectedDomains: MultiValue<DomainOption>;
        minYearsOfExperience: number;
        minRating: number;
    }) => void;
}

const MentorFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [selectedDomains, setSelectedDomains] = useState<MultiValue<DomainOption>>([]);
    const [domainOptions, setDomainOptions] = useState<DomainOption[]>([]);
    const [minYearsOfExperience, setMinYearsOfExperience] = useState<number>(0);
    const [minRating, setMinRating] = useState<number>(0);

    useEffect(() => {
        const fetchDomains = async () => {
            const response = await fetch(`http://localhost:8080/domains`);
            const domains = await response.json();
            const formattedDomains = domains.map((domain: { id: string; name: string }) => ({
                value: domain.id,
                label: domain.name
            }));
            setDomainOptions(formattedDomains);
        };
        fetchDomains();
    }, []);

    const handleDomainChange = (selectedOptions: MultiValue<DomainOption>) => {
        setSelectedDomains(selectedOptions);
        onFilterChange({ selectedDomains: selectedOptions, minYearsOfExperience, minRating });
    };

    const handleYearsOfExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinYearsOfExperience(Number(e.target.value));
        onFilterChange({ selectedDomains, minYearsOfExperience: Number(e.target.value), minRating });
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinRating(Number(e.target.value));
        onFilterChange({ selectedDomains, minYearsOfExperience, minRating: Number(e.target.value) });
    };

    return (
        <div className="filters">
            <Select
                isMulti
                options={domainOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleDomainChange}
                value={selectedDomains}
                placeholder="Filter by Domain"
            />
            <div>
                <label>Minimum Years of Experience: {minYearsOfExperience}</label>
                <input
                    type="range"
                    min="0"
                    max="10" // TODO: should be the max value from db
                    value={minYearsOfExperience}
                    onChange={handleYearsOfExperienceChange}
                />
            </div>
            <div>
                <label>Minimum Rating: {minRating}</label>
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={minRating}
                    onChange={handleRatingChange}
                />
            </div>
        </div>
    );
};

export default MentorFilters;
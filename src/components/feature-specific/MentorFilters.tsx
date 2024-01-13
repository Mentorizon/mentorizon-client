import React, { useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';

interface DomainOption {
    value: string;
    label: string;
}

interface ExperienceRange {
    min: number;
    max: number;
}

interface FiltersProps {
    onFilterChange: (filters: {
        selectedDomains: MultiValue<DomainOption>;
        yearsOfExperienceRange: ExperienceRange;
        rating: number;
    }) => void;
}

const MentorFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [selectedDomains, setSelectedDomains] = useState<MultiValue<DomainOption>>([]);
    const [yearsOfExperienceRange, setYearsOfExperienceRange] = useState<ExperienceRange>({ min: 0, max: 20 });
    const [rating, setRating] = useState<number>(0);

    // Replace with actual domain options fetched from the backend
    const domainOptions: DomainOption[] = [
        { value: 'java', label: 'Java' },
        { value: 'python', label: 'Python' },
        // ... other domain options
    ];

    const handleDomainChange = (selectedOptions: MultiValue<DomainOption>, actionMeta: ActionMeta<DomainOption>) => {
        setSelectedDomains(selectedOptions);
        onFilterChange({ selectedDomains: selectedOptions, yearsOfExperienceRange, rating });
    };

    const handleYearsOfExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const range = { ...yearsOfExperienceRange, [e.target.name]: Number(e.target.value) };
        setYearsOfExperienceRange(range);
        onFilterChange({ selectedDomains, yearsOfExperienceRange: range, rating });
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = Number(e.target.value);
        setRating(newRating);
        onFilterChange({ selectedDomains, yearsOfExperienceRange, rating: newRating });
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
            <input
                type="range"
                min="0"
                max="20"
                value={yearsOfExperienceRange.min}
                name="min"
                onChange={handleYearsOfExperienceChange}
            />
            <input
                type="range"
                min="0"
                max="20"
                value={yearsOfExperienceRange.max}
                name="max"
                onChange={handleYearsOfExperienceChange}
            />
            <input
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={handleRatingChange}
            />
        </div>
    );
};

export default MentorFilters;

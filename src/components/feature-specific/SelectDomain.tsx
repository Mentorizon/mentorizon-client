import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import { Domain } from "../../types";

interface SelectDomainProps {
    initialDomains?: Domain[];
    onDomainsChange: (selectedDomains: Domain[]) => void;
}

const SelectDomain: React.FC<SelectDomainProps> = ({ initialDomains, onDomainsChange }) => {
    const [domainOptions, setDomainOptions] = useState<Domain[]>([]);
    const [selectedDomains, setSelectedDomains] = useState<Domain[]>(initialDomains || []);

    useEffect(() => {
        fetch('http://localhost:8080/domains')
            .then(response => response.json())
            .then(data => {
                const options = data.map((domain: Domain) => ({
                    value: domain.id.toString(),
                    label: domain.name
                }));
                setDomainOptions(options);
                setSelectedDomains(initialDomains || []);
            })
            .catch(error => console.error("Error fetching domains:", error));
    }, [initialDomains]);

    const handleDomainSelect = (selectedOptions: Domain[]) => {
        const selected = selectedOptions;
        setSelectedDomains(selected);
        onDomainsChange(selected);
    };

    return (
        <Select
            isMulti
            name="domains"
            options={domainOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleDomainSelect as any}
            value={selectedDomains}
        />
    );
};

export default SelectDomain;

import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import { Domain, Option } from "../../types";

interface SelectDomainProps {
    onDomainsChange: (selectedDomains: Option[]) => void;
}

const SelectDomain: React.FC<SelectDomainProps> = ({ onDomainsChange }) => {
    const [domainOptions, setDomainOptions] = useState<Option[]>([]);
    const [selectedDomains, setSelectedDomains] = useState<Option[]>([]);

    const fetchDomains = async (): Promise<Domain[]> => {
        try {
            const response = await fetch('http://localhost:8080/domains');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error("There was a problem fetching the domains: ", error);
            return [];
        }
    };

    useEffect(() => {
        fetchDomains().then(data => {
            const options: Option[] = data.map((domain: Domain) => ({
                value: domain.id,
                label: domain.name
            }));
            setDomainOptions(options);
        });
    }, []);

    const handleDomainSelect = (selectedOptions: readonly Option[]) => {
        setSelectedDomains([...selectedOptions]);
        onDomainsChange([...selectedOptions]);
    };

    return (
        <Select
            isMulti
            name="domains"
            options={domainOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleDomainSelect}
            value={selectedDomains}
        />
    );
};

export default SelectDomain;

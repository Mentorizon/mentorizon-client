export interface Mentor {
    id: string;
    name: string;
    jobTitle: string;
    description: string;
    yearsOfExperience: number;
    domains: string[];
    rating: number;
    ratingsNumber: number;
}

export interface Domain {
    id: string;
    name: string;
}

export interface Option {
    value: string;
    label: string;
}
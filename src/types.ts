export interface Mentor {
    id: string;
    name: string;
    jobTitle: string;
    description: string;
    yearsOfExperience: number;
    domains: Domain[];
    rating: number;
    ratingsNumber: number;
}

export interface Domain {
    id: string;
    name: string;
}
import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthStorage from "../services/AuthStorage";
import SelectDomain from "../components/feature-specific/SelectDomain";
import {Domain, DomainOption} from "../types";
import Layout from "../components/common/Layout";
import {toast, ToastContainer} from "react-toastify";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    jobTitle?: string;
    yearsOfExperience?: number;
    description?: string;
    domains?: any;
    contactInfo?: string;
    rating?: number;
    ratingsNumber?: number;
    approved?: boolean;
}
const ProfileEdit: React.FC = () => {
    const userId = AuthStorage.getUserId();
    const [profile, setProfile] = useState<UserProfile>({
        id: '',
        name: '',
        email: '',
        jobTitle: '',
        yearsOfExperience: 0,
        description: '',
        domains: [],
        contactInfo: '',
        rating: 0,
        ratingsNumber: 0,
        approved: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                let url = `http://localhost:8080/`;
                url += AuthStorage.isMentor() ? 'mentors/' : 'mentees/';
                url += userId;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                const domains = data.domains ? data.domains.map((domain: Domain) => ({
                    value: domain.id,
                    label: domain.name
                })) : [];

                setProfile({
                    ...data,
                    domains
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDomainsChange = (selectedDomains: Domain[]) => {
        setProfile(prevState => ({ ...prevState, domains: selectedDomains }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const domainsForBackend = profile.domains.map((domain: DomainOption) => ({
            id: domain.value,
            name: domain.label
        }));

        const profileDataForBackend = {
            ...profile,
            domains: domainsForBackend
        };

        delete profileDataForBackend.rating;
        delete profileDataForBackend.ratingsNumber;
        delete profileDataForBackend.approved;

        console.log('profileDataForBackend:', profileDataForBackend);

        const url = `http://localhost:8080/${AuthStorage.isMentor() ? 'mentors' : 'mentees'}/${profile.id}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthStorage.getToken()}`
                },
                body: JSON.stringify(profileDataForBackend) // Send the transformed data
            });

            if (response.ok) {
                toast.success('Profile updated successfully!');
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again later.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <ToastContainer />
            <Container>
                <h2>Edit Profile</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={profile.email}
                            required
                            disabled
                        />
                    </FormGroup>

                    {profile.jobTitle && (
                        <>
                            <FormGroup>
                                <Label for="jobTitle">Job Title</Label>
                                <Input
                                    type="text"
                                    name="jobTitle"
                                    id="jobTitle"
                                    value={profile.jobTitle}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="yearsOfExperience">Years Of Experience</Label>
                                <Input
                                    type="number"
                                    name="yearsOfExperience"
                                    id="yearsOfExperience"
                                    value={profile.yearsOfExperience}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={6}
                                    value={profile.description}
                                    onChange={handleInputChange}
                                    required
                                    className="textarea-custom"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Domains</Label>
                                <SelectDomain
                                    initialDomains={profile.domains}
                                    onDomainsChange={handleDomainsChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="contactInfo">Contact Info</Label>
                                <Input
                                    type="text"
                                    name="contactInfo"
                                    id="contactInfo"
                                    value={profile.contactInfo}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Input
                                    type="number"
                                    name="rating"
                                    id="rating"
                                    value={profile.rating}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ratingsNumber">Ratings number</Label>
                                <Input
                                    type="number"
                                    name="ratingsNumber"
                                    id="ratingsNumber"
                                    value={profile.ratingsNumber}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Are you approved mentor?</Label>{' '}
                                <Label>{profile.approved ? "Yes" : "No"}</Label>
                            </FormGroup>
                        </>
                    )}
                    <Button type="submit" color="primary" disabled={isLoading} className="save-changes-button">
                        Save Changes
                    </Button>
                </Form>
            </Container>
        </Layout>
    );
};

export default ProfileEdit;


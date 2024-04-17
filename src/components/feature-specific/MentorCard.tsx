import { Mentor } from '../../types';
import {useNavigate} from "react-router-dom";
import StarRating from "./StarRating";
import React from "react";
import {ToastContainer} from "react-toastify";
import useRating from "../../hooks/useRating";

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
    const navigate = useNavigate();
    const { mentorRating, ratingsNumber, rateMentor } = useRating(mentor.id, mentor.rating, mentor.ratingsNumber);


    const handleApplyClick = () => navigate(`/apply/${mentor.id}`);

    return (
        <div className="mentor-card">
            <div className="mentor-header">
                <h3 className="center-text">{mentor.name}</h3>
                <p className="center-text">{mentor.jobTitle}</p>
                <div className="experience-rating-row">
                    <p className="years-experience">{mentor.yearsOfExperience} years</p>
                    <div className="mentor-rating">
                        <StarRating currentRating={Math.round(mentor.rating)} onRating={rateMentor}/>
                        <span className="reviews">{mentorRating} ({ratingsNumber} reviews)</span>
                    </div>
                </div>
            </div>
            <div className="mentor-body">
                <p>{mentor.description}</p>
                <div className="mentor-domains">
                    {mentor.domains.map((domain: string, index: number) => (
                        <span key={index} className="domain">{domain}</span>
                    ))}
                </div>
            </div>
            <div className="mentor-footer">
                <button className="view-profile">View Profile</button>
                <button className="apply" onClick={handleApplyClick}>Apply</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MentorCard;
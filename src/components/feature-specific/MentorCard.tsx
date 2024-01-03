import { Mentor } from '../../types';

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
    return (
        <div className="mentor-card">
            <div className="mentor-header">
                <h3 className="center-text">{mentor.name}</h3>
                <p className="center-text">{mentor.jobTitle}</p>
                <div className="experience-rating-row">
                    <p className="years-experience">{mentor.yearsOfExperience} years</p>
                    <div className="mentor-rating">
                        {Array.from({ length: mentor.rating }, (_, i) => (
                            <span key={i}>⭐</span>
                        ))}
                        <span className="reviews">{mentor.rating}.0 (8 reviews)</span>
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
                <button className="apply">Apply</button>
            </div>
        </div>
    );
};

export default MentorCard;
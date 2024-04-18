import React, {useState} from "react";
import AuthStorage from "../../services/AuthStorage";
import useRating from "../../hooks/useRating";

interface StarRatingProps {
    mentorId: string;
    currentRating: number;
    currentRatingsNumber: number;
}

const StarRating: React.FC<StarRatingProps> = ({ mentorId, currentRating, currentRatingsNumber }) => {
    const [rating, setRating] = useState(currentRating);
    const { mentorRating, ratingsNumber, rateMentor } = useRating(mentorId, currentRating, currentRatingsNumber);

    const handleClick = (rate: number) => {
        setRating(rate);
        rateMentor(rate);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => AuthStorage.isMentee() && handleClick(star)}
                      style={{cursor: AuthStorage.isMentee() ? 'pointer' : 'default'}}>
                    {star <= rating ? '⭐' : '☆'}
                </span>
            ))}
            <span className="reviews">{mentorRating} ({ratingsNumber} reviews)</span>
        </div>
    );
};

export default StarRating;

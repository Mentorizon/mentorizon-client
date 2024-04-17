import React, {useState} from "react";
import AuthStorage from "../../services/AuthStorage";

const StarRating: React.FC<{ currentRating: number, onRating: (rating: number) => void }> = ({ currentRating, onRating }) => {
    const [rating, setRating] = useState(currentRating);

    const handleClick = (rate: number) => {
        setRating(rate);
        onRating(rate);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => AuthStorage.isMentee() && handleClick(star)}
                      style={{cursor: AuthStorage.isMentee() ? 'pointer' : 'default'}}>
                    {star <= rating ? '⭐' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default StarRating;

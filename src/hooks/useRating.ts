import { useState } from "react";
import { toast } from "react-toastify";
import AuthStorage from "../services/AuthStorage";

const useRating = (mentorId: string, initialRating: number, initialRatingsNumber: number) => {
    const [mentorRating, setMentorRating] = useState(initialRating);
    const [ratingsNumber, setRatingsNumber] = useState(initialRatingsNumber);
    const rateMentor = async (newRating: number) => {
        try {
            const response = await fetch('/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mentorId: mentorId,
                    menteeId: AuthStorage.getUserId(),
                    starsNumber: newRating
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setMentorRating(responseData.averageRating);
                setRatingsNumber(responseData.ratingsNumber);
                const starsString = newRating === 1 ? 'star' : 'stars'
                toast.success(`You have rated this mentor with ${newRating} ${starsString} successfully!`);
            } else {
                toast.error('Rating failed, please try again.');
            }
        } catch (error) {
            toast.error('An error occurred, please try again.');
        }
    };

    return { mentorRating, ratingsNumber, rateMentor };
};

export default useRating
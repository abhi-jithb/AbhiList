import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore instance
import { doc, setDoc } from 'firebase/firestore';

const ReviewComponent = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // State to control visibility

    const handleRating = async (star) => {
        setRating(star);
        const userId = "exampleUserId"; // Replace with actual user ID from auth context

        // Save the rating and review text to Firestore
        await setDoc(doc(db, 'userReviews', userId), {
            rating: star,
            review: reviewText,
        });

        setReviewSubmitted(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you want to submit the review with the rating
        if (rating > 0) {
            await handleRating(rating);
        }
        // Clear the review text after submission
        setReviewText('');
    };

    const handleClose = () => {
        setIsVisible(false); // Hide the component
    };

    if (!isVisible) return null; // Return null to not render the component if not visible

    return (
        <div className="review-container">
            <button onClick={handleClose} className="close-btn">
                &times; {/* Close button */}
            </button>
            <h3>Rate Us</h3>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    const starRating = index + 1;
                    return (
                        <span
                            key={starRating}
                            onClick={() => handleRating(starRating)}
                            onMouseEnter={() => setHoverRating(starRating)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                color: starRating <= (hoverRating || rating) ? 'gold' : 'grey',
                            }}
                        >
                            ★
                        </span>
                    );
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Your feedback"
                    required
                />
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
            {reviewSubmitted && <p>Thank you for your feedback!</p>}
        </div>
    );
};

export default ReviewComponent;

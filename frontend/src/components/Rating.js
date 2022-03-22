import React from 'react';

const Rating = ({ rating, numReviews, maxStars }) => {
  return (
    <div className="rating">
      {createStarRating(rating, 1, 0.5)}
      {createStarRating(rating, 2, 1.5)}
      {createStarRating(rating, 3, 2.5)}
      {createStarRating(rating, 4, 3.5)}
      {createStarRating(rating, 5, 4.5)}
      <span>{numReviews}</span>
    </div>
  );
};

const createStarRating = (rating, upper, lower) => {
  return (
    <span>
      <i
        className={
          rating >= upper
            ? 'fas fa-star'
            : rating >= lower
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        }
      />
    </span>
  );
};

export default Rating;

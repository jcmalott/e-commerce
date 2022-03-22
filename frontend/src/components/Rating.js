import React from 'react';

const Rating = ({ rating, numReviews }) => {
  return (
    <div className="rating">
      {createStarRating(rating, 1, 0.5, numReviews)}
      {createStarRating(rating, 2, 1.5, numReviews)}
      {createStarRating(rating, 3, 2.5, numReviews)}
      {createStarRating(rating, 4, 3.5, numReviews)}
      {createStarRating(rating, 5, 4.5, numReviews)}
      <span>{numReviews} reviews</span>
    </div>
  );
};

const createStarRating = (rating, upper, lower, numReviews) => {
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

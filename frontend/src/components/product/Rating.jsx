import React from "react";
import Stars from "./Stars";

const Rating = ({ value, text }) => {
  const nbFullStars = Math.floor(value);
  const hasHalfStar = value - nbFullStars >= 0.5;
  const nbEmptyStars = 5 - nbFullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating">
      <Stars starType="full" nb={nbFullStars} />
      {hasHalfStar && <Stars starType="half" />}
      <Stars starType="empty" nb={nbEmptyStars} />
      <span className="ml-2">{text && text}</span>
    </div>
  );
};

export default Rating;

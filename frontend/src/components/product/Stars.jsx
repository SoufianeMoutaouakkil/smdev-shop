import React, { useEffect, useState } from "react";

const Stars = ({ starType, nb = 1 }) => {
  const emptyStar = <i className="far fa-star"></i>;
  const [renderedStar, setRenderedStar] = useState(emptyStar);
  useEffect(() => {
    if (starType === "full") {
      setRenderedStar(<i className="fas fa-star"></i>);
    } else if (starType === "half") {
      setRenderedStar(<i className="fas fa-star-half-alt"></i>);
    } else {
      setRenderedStar(<i className="far fa-star"></i>);
    }
  }, [starType]);

  return (
    <span>
      {[...Array(nb).keys()].map((i) => (
        <span key={i}>{renderedStar}</span>
      ))}
    </span>
  );
};

export default Stars;

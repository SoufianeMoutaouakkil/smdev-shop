import { useState, useEffect } from "react";
import Stars from "./Stars";
import { reviewsSearch } from "../../services/store/slices/reviewsSlice";
import { useDispatch, useSelector } from "react-redux";

const Rating = ({ productId }) => {
    const [numReviews, setNumReviews] = useState(0);
    const [rating, setRating] = useState(0);
    const [nbFullStars, setNbFullStars] = useState(0);
    const [hasHalfStar, setHasHalfStar] = useState(false);
    const [nbEmptyStars, setNbEmptyStars] = useState(0);

    const dispatch = useDispatch();
    const fetchedReviews = useSelector((state) => state.reviews?.search);

    useEffect(() => {
        const query = { field: "productId", value: productId };
        console.log("Fetching reviews");
        dispatch(reviewsSearch({ query }));
    }, [dispatch, productId]);

    useEffect(() => {
        console.log({ fetchedReviews });
        if (fetchedReviews?.data && fetchedReviews?.data.length > 0) {
            const reviews = fetchedReviews.data;
            const totalRating = reviews.reduce(
                (acc, review) => acc + review.rating,
                0
            );
            setRating(calculateRating(reviews.length, totalRating));
            setNumReviews(reviews.length);
        }
    }, [fetchedReviews]);

    useEffect(() => {
        setNbFullStars(Math.floor(rating));
        setHasHalfStar(rating - Math.floor(rating) >= 0.5);
        setNbEmptyStars(5 - Math.ceil(rating));
    }, [rating]);

    const calculateRating = (nbReviews, totalRating) => {
        let rating = totalRating / nbReviews;
        rating = Math.round(rating * 2) / 2;
        return rating;
    };

    return (
        <div className="rating">
            <Stars starType="full" nb={nbFullStars} />
            {hasHalfStar && <Stars starType="half" />}
            <Stars starType="empty" nb={nbEmptyStars} />
            <span>{numReviews} reviews</span>
        </div>
    );
};

export default Rating;

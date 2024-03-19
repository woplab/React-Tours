import React, { useState, useEffect } from 'react';

const RatingAndBookings: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [bookings, setBookings] = useState<number>(0);

    useEffect(() => {
        const randomRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
        setRating(parseFloat(randomRating));


        const randomBookings = Math.floor(Math.random() * 1000) + 1;
        setBookings(randomBookings);
    }, []);

    return (
        <div className="my-4 flex flex-row gap-8">
            <p className="text-dark_blue">Rating: {rating}</p>
            <p className="text-dark_blue">Bookings: {bookings}</p>
        </div>
    );
};

export default RatingAndBookings;

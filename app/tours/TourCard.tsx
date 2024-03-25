// app/tours/TourCard.tsx
import React from 'react';

interface Tour {
    id: number;
    name: string;
    price_per_day: number;
    description: string;
    duration: string;

    group_size: number;
    age_category: string;
    languages: string[];
    pictures: string[];
    destinations: string[];
    attractions: string[];
    start_date: string;
    end_date: string;
    whatsIncluded: string[];
    whatsNotIncluded: string[];
    itinerary: string[];
}

interface TourCardProps {
    tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className="border border-light_gray2 rounded-lg p-4 mb-8">
            <img src={tour.pictures[0]} alt={tour.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold mb-2">{tour.name}</h3>
            <p className="text-gray-600 mb-2">${tour.price_per_day} per day</p>
        </div>
    );
};

export default TourCard;

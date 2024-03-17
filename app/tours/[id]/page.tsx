// app/tours/[id]/page.tsx
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import toursData from '../../../public/data/tours/tours.json';

interface TourProps {
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
}

const TourPage: React.FC = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split('/').pop()!, 10);

    if (isNaN(id)) {
        return <div>Tour ID is not valid</div>;
    }

    // Find the tour with the matching ID
    const tour: TourProps | undefined = toursData.tours.find((tour) => tour.id === id);

    if (!tour) {
        return <div>Tour not found</div>;
    }

    return (
        <div className="container mx-auto">
            <h1>{tour.name}</h1>
            <p>Price per day: ${tour.price_per_day}</p>
            <p>Description: {tour.description}</p>
            <p>Duration: {tour.duration}</p>
            <p>Group size: {tour.group_size}</p>
            <p>Age category: {tour.age_category}</p>
            <p>Languages: {tour.languages.join(', ')}</p>
            <p>Destinations: {tour.destinations.join(', ')}</p>
            <p>Attractions: {tour.attractions.join(', ')}</p>
            <div>
                {tour.pictures.map((picture, index) => (
                    <img key={index} src={picture} alt={`Tour ${tour.id} - Image ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default TourPage;

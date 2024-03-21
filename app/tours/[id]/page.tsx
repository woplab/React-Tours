'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import toursData from '../../../public/data/tours/tours.json';
import TourRating from '../../ui/tours/TourRating';
import TourShare from '../../ui/tours/TourShare';
import TourGallery from '../../ui/tours/TourGallery';
import TourDetails from '../../ui/tours/TourDetails';
import Breadcrumbs from '../../ui/tours/Breadcrumbs';
import BookingComponent  from '../../ui/tours/Booking';

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
    start_date: string;
    end_date: string;
}

const TourPage: React.FC = () => {
    const pathname = usePathname();
    const id = parseInt(pathname.split('/').pop()!, 10);

    if (isNaN(id)) {
        return <div>Tour ID is not valid</div>;
    }

    const tour: TourProps | undefined = toursData.tours.find((tour) => tour.id === id);

    if (!tour) {
        return <div>Tour not found</div>;
    }

    return (
        <div className="container mx-auto py-8 px-8">

            {/* Breadcrumbs */}
            <Breadcrumbs tourName={tour.name} />

            <h1 className="text-2xl text-dark_blue font-bold ">{tour.name}</h1>

            <div className='flex flex-row justify-between'>
                {/* TourRating */}
                <TourRating />

                {/* TourShare */}
                <TourShare url={`https://example.com/tours/${tour.id}`} />
            </div>

            {/* Use TourGallery component */}
            <TourGallery pictures={tour.pictures} />
            <div className="flex flex-row justify-between gap-8">
                <div className="w-2/3">
                    {/* TourDetails */}
                    <TourDetails
                        duration={tour.duration}
                        groupSize={tour.group_size}
                        ageCategory={tour.age_category}
                        languages={tour.languages}
                    />

                    <p>Description: {tour.description}</p>
                    <p>Destinations: {tour.destinations.join(', ')}</p>
                    <p>Attractions: {tour.attractions.join(', ')}</p>
                </div>

                <div className="w-1/3">
                    {/* Booking */}
                    <BookingComponent tour={tour} />
                </div>
            </div>


        </div>
    );
};

export default TourPage;

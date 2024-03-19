'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import toursData from '../../../public/data/tours/tours.json';
import TourRating from '../../ui/tours/TourRating';
import TourShare from '../../ui/tours/TourShare';
import TourGallery from '../../ui/tours/TourGallery';
import TourDetails from '../../ui/tours/TourDetails';

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

    const tour: TourProps | undefined = toursData.tours.find((tour) => tour.id === id);

    if (!tour) {
        return <div>Tour not found</div>;
    }

    return (
        <div className="container mx-auto py-8 px-8">
            <div className="flex flex-row justify-between items-center">
                <nav className="py-4 text-sm" aria-label="breadcrumbs">
                    <ol className="flex space-x-4">
                        <li>
                            <Link className="text-dark_blue" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="text-dark_blue">{'>'}</span>
                            <Link className="text-dark_blue" href="/tours">
                                Tours
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="text-dark_blue">{'>'}</span>
                            <span className="text-dark_blue">{tour.name}</span>
                        </li>
                    </ol>
                </nav>
            </div>

            <h1 className="text-2xl text-dark_blue font-bold ">{tour.name}</h1>

            <div className='flex flex-row justify-between'>
                {/* TourRating */}
                <TourRating />

                {/* TourShare */}
                <TourShare url={`https://example.com/tours/${tour.id}`} />
            </div>

            {/* Use TourGallery component */}
            <TourGallery pictures={tour.pictures} />

            {/* TourDetails */}
            <TourDetails
                duration={tour.duration}
                groupSize={tour.group_size}
                ageCategory={tour.age_category}
                languages={tour.languages}
            />

            <p>Price per day: ${tour.price_per_day}</p>
            <p>Description: {tour.description}</p>
            <p>Destinations: {tour.destinations.join(', ')}</p>
            <p>Attractions: {tour.attractions.join(', ')}</p>
        </div>
    );
};

export default TourPage;

// app/tours/page.tsx
'use client';
import React, { useState } from 'react';
import toursData from '../../public/data/tours/tours.json';
import TourCard from '../ui/tours/TourCard'; // Component for displaying a single tour
import Filters from '../ui/tours/Filters'; // Component for filters
import Pagination from '../ui/tours/Pagination'; // Component for pagination

interface Tour {
    id: number;
    name: string;
    price_per_day: number;
    description: string; // Changed from listing
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

function Page() {
    const [tours, setTours] = useState<Tour[]>(toursData.tours);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        price_per_day: '',
        duration: '',
        group_size: '',
        age_category: '',
        languages: '',
        destinations: '',
        attractions: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [toursPerPage] = useState(6); // Number of tours per page

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handle filtering change
    const handleFilterChange = (filterName: string, value: string) => {
        setFilters({ ...filters, [filterName]: value });
    };

    // Filter tours based on search term and filters
    const filteredTours = tours.filter((tour) => {
        const searchTermMatch = tour.name.toLowerCase().includes(searchTerm.toLowerCase());
        const priceMatch = !filters.price_per_day || tour.price_per_day <= parseInt(filters.price_per_day);
        const durationMatch = !filters.duration || tour.duration === filters.duration;
        const groupSizeMatch = !filters.group_size || tour.group_size === parseInt(filters.group_size);
        const ageCategoryMatch = !filters.age_category || tour.age_category === filters.age_category;
        const languagesMatch = !filters.languages || tour.languages.includes(filters.languages);
        const destinationsMatch = !filters.destinations || tour.destinations.includes(filters.destinations);
        const attractionsMatch = !filters.attractions || tour.attractions.includes(filters.attractions);

        return (
            searchTermMatch &&
            priceMatch &&
            durationMatch &&
            groupSizeMatch &&
            ageCategoryMatch &&
            languagesMatch &&
            destinationsMatch &&
            attractionsMatch
        );
    });

    // Pagination
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto py-8 flex">
            <div className="w-1/4 pr-4">
                <Filters tours={tours} onChange={handleFilterChange} />
            </div>
            <div className="w-3/4">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search tours..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 border border-light_gray2 rounded-md w-full "
                    />
                </div>
                <div className="grid grid-cols-1">
                    {currentTours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>
                <Pagination
                    toursPerPage={toursPerPage}
                    totalTours={filteredTours.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default Page;

'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/reducers';
import { updateFilters, resetFilters } from '../../app/reducers/filtersSlice';
import { setCurrentPage } from '../../app/reducers/paginationSlice';
import toursData from '../../public/data/tours/tours.json';
import TourCard from '../ui/tours/TourCard';
import Filters from '../ui/tours/Filters';
import Pagination from '../ui/tours/Pagination';

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

function Page() {
    const dispatch = useDispatch();
    const { filters, pagination } = useSelector((state: RootState) => state); // Get filters and pagination from Redux store

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const url_destinations = urlParams.get('destinations');
        const url_attractions = urlParams.get('attractions');

        if (url_destinations) {
            dispatch(updateFilters({ destinations: url_destinations }));
        }
        if (url_attractions) {
            dispatch(updateFilters({ attractions: url_attractions }));
        }
    }, [dispatch]);

    const handleFilterChange = (filterName: string, value: string) => {
        dispatch(updateFilters({ [filterName]: value }));
        dispatch(setCurrentPage(1)); // Reset to first page when filters change
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        dispatch(setCurrentPage(1)); // Reset to first page when filters are reset
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tours = toursData.tours;

    const filteredTours = tours.filter((tour) => {
        const priceMatch = !filters.price_per_day || tour.price_per_day <= parseInt(filters.price_per_day);
        const durationMatch = !filters.duration || tour.duration === filters.duration;
        const groupSizeMatch = !filters.group_size || tour.group_size === parseInt(filters.group_size);
        const ageCategoryMatch = !filters.age_category || tour.age_category === filters.age_category;
        const languagesMatch = !filters.languages || tour.languages.includes(filters.languages);
        const destinationsMatch = !filters.destinations || tour.destinations.includes(filters.destinations);
        const attractionsMatch = !filters.attractions || tour.attractions.includes(filters.attractions);

        return (
            priceMatch &&
            durationMatch &&
            groupSizeMatch &&
            ageCategoryMatch &&
            languagesMatch &&
            destinationsMatch &&
            attractionsMatch
        );
    });

    const toursPerPage = 6;
    const indexOfLastTour = pagination.currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

    const paginate = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="container mx-auto py-8 px-8 flex lg:flex-row flex-col lg:gap-0 gap-8">
                <div className="lg:w-1/4 w-full lg:pr-4">
                    <Filters tours={tours} onChange={handleFilterChange} onReset={handleResetFilters} />
                </div>
                <div className="lg:w-3/4 w-full">
                    {filteredTours.length === 0 ? (
                        <div className="text-center text-gray-600">No tours found.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1">
                                {currentTours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} />
                                ))}
                            </div>
                            <Pagination
                                toursPerPage={toursPerPage}
                                totalTours={filteredTours.length}
                                paginate={paginate}
                                currentPage={pagination.currentPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;

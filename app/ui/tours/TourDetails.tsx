import React from 'react';
import { FaClock, FaUsers, FaChild, FaLanguage } from 'react-icons/fa';

interface TourDetailsProps {
    duration: string;
    groupSize: number;
    ageCategory: string;
    languages: string[];
}

const TourDetails: React.FC<TourDetailsProps> = ({ duration, groupSize, ageCategory, languages }) => {
    return (
        <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{duration}</span>
            </div>
            <div className="flex items-center">
                <FaUsers className="mr-2" />
                <span>{groupSize} people</span>
            </div>
            <div className="flex items-center">
                <FaChild className="mr-2" />
                <span>{ageCategory}</span>
            </div>
            <div className="flex items-center">
                <FaLanguage className="mr-2" />
                <span>{languages.join(', ')}</span>
            </div>
        </div>
    );
};

export default TourDetails;

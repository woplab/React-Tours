import React, { useState } from 'react';
import { differenceInDays, format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

interface BookingProps {
    tour: {
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
    };
}

const BookingComponent: React.FC<BookingProps> = ({ tour }) => {
    if (!tour) {
        return <div>Loading...</div>;
    }

    const [adultTickets, setAdultTickets] = useState(1);
    const [childTickets, setChildTickets] = useState(0);
    const [seniorTickets, setSeniorTickets] = useState(0);
    const [addServicePerBooking, setAddServicePerBooking] = useState(false);
    const [addServicePerPerson, setAddServicePerPerson] = useState(false);

    const basePrice =
        tour.price_per_day * (adultTickets + childTickets + seniorTickets) +
        (childTickets * 0.2 * tour.price_per_day) +
        (seniorTickets * 0.1 * tour.price_per_day);

    const totalPrice = (addServicePerBooking ? basePrice + 50 : basePrice) +
        (addServicePerPerson ? (childTickets + seniorTickets) * 20 : 0);

    const startDate = new Date(tour.start_date);
    const endDate = new Date(tour.end_date);
    const durationInDays = differenceInDays(endDate, startDate) + 1;

    const minTotalPrice = tour.price_per_day * durationInDays;

    const handleAdultChange = (value: number) => {
        setAdultTickets(value);
    };

    const handleChildChange = (value: number) => {
        setChildTickets(value);
    };

    const handleSeniorChange = (value: number) => {
        setSeniorTickets(value);
    };

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter((prevValue) => prevValue + 1);
    };

    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    };

    return (
        <div className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">From: ${minTotalPrice}</h2>
            <div className="mb-4 p-4 border border-light_gray2 rounded-lg flex flex-row gap-5 justify-between">
                <div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="inline-block mr-2 h-5 w-5" />
                        <p className="font-bold text-lg">From:</p>
                    </div>
                    <p>{format(startDate, 'MMMM dd, yyyy')}</p>
                </div>

                <div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="inline-block mr-2 h-5 w-5" />
                        <p className="font-bold text-lg">To:</p>
                    </div>
                    <p>{format(endDate, 'MMMM dd, yyyy')}</p>
                </div>
            </div>


            <h2 className="text-xl font-bold mb-2">Tickets</h2>
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-lg mr-2">Adult ${tour.price_per_day}</label>
                    <div className="ticket-counter flex flex-row items-center">
                        <button className="ticket-button" onClick={() => decrement(setAdultTickets)}>-</button>
                        <div className="ticket-number">{adultTickets}</div>
                        <button className="ticket-button" onClick={() => increment(setAdultTickets)}>+</button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <label className="text-lg mr-2">Child (+20%)</label>
                    <div className="ticket-counter flex flex-row items-center">
                        <button className="ticket-button" onClick={() => decrement(setChildTickets)}>-</button>
                        <div className="ticket-number">{childTickets}</div>
                        <button className="ticket-button" onClick={() => increment(setChildTickets)}>+</button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <label className="text-lg mr-2">Senior (+10%)</label>
                    <div className="ticket-counter flex flex-row items-center">
                        <button className="ticket-button" onClick={() => decrement(setSeniorTickets)}>-</button>
                        <div className="ticket-number">{seniorTickets}</div>
                        <button className="ticket-button" onClick={() => increment(setSeniorTickets)}>+</button>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="text-lg mr-2">Additional Services:</label>
                <label htmlFor="addServiceBooking" className="mr-2">
                    <input
                        id="addServiceBooking"
                        type="checkbox"
                        checked={addServicePerBooking}
                        onChange={() => setAddServicePerBooking(!addServicePerBooking)}
                        className="mr-1"
                    />
                    Add Service per booking
                </label>
                <label htmlFor="addServicePerson">
                    <input
                        id="addServicePerson"
                        type="checkbox"
                        checked={addServicePerPerson}
                        onChange={() => setAddServicePerPerson(!addServicePerPerson)}
                        className="mr-1"
                    />
                    Add Service per person
                </label>
            </div>

            <p className="text-xl font-bold mb-2">Total Price: ${totalPrice}</p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Book Now
            </button>
        </div>
    );
};

export default BookingComponent;

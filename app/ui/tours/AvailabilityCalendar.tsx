import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface AvailabilityCalendarProps {
    startDate: Date;
    endDate: Date;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
                                                                       startDate,
                                                                       endDate,
                                                                   }) => {
    const dateRange = (start: Date, end: Date) => {
        const dates = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const markedDates = dateRange(startDate, endDate);

    const tileClassName = ({ date }: { date: Date }) =>
        markedDates.find((markedDate) => markedDate.toDateString() === date.toDateString())
            ? 'availability'
            : '';

    return (
        <div className="availability-calendar my-8">
            <h2 className="text-2xl font-bold mb-4">Availability Calendar</h2>
            <Calendar
                className="rounded-lg shadow-md border-0"
                tileClassName={tileClassName}
                locale="en-US"
                minDate={startDate}
                maxDate={endDate}
                defaultActiveStartDate={startDate}
                value={startDate}
            />
        </div>
    );
};

export default AvailabilityCalendar;

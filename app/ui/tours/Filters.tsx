import React, { useState, useEffect } from 'react';

interface Tour {
    price_per_day: number;
    duration: string;
    group_size: number;
    age_category: string;
    languages: string[];
    destinations: string[];
    attractions: string[];
}

interface FiltersProps {
    tours: Tour[];
    onChange: (filterName: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ tours, onChange }) => {
    const uniqueValues = (field: keyof Tour) => {
        const values = new Set<string>();
        tours.forEach(tour => {
            if (field === 'languages' || field === 'destinations' || field === 'attractions') {
                (tour[field] as string[]).forEach(value => values.add(value));
            } else {
                values.add(tour[field].toString());
            }
        });
        return Array.from(values);
    };

    // Calculate min and max prices
    const prices = tours.map(tour => tour.price_per_day);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // State for current price
    const [currentPrice, setCurrentPrice] = useState<string>(maxPrice.toString());

    // Function to format price
    const formatPrice = (price: number) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    // Handle change in price range
    const handlePriceChange = (value: string) => {
        setCurrentPrice(value);
        onChange('price_per_day', value);
    };

    // Update current price to maxPrice on initial render
    useEffect(() => {
        setCurrentPrice(maxPrice.toString());
    }, [maxPrice]);

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <span className="text-gray-600">Current price: {formatPrice(parseFloat(currentPrice))}</span>
            <div className="flex justify-between">
                <span>{formatPrice(minPrice)}</span>
                <span>{formatPrice(maxPrice)}</span>
            </div>
            <input
                type="range"
                min={minPrice.toString()}
                max={maxPrice.toString()}
                value={currentPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="border border-gray-300 rounded-md"
            />
            <select
                onChange={(e) => onChange('duration', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Duration</option>
                {uniqueValues('duration').map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <select
                onChange={(e) => onChange('group_size', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Group Size</option>
                {uniqueValues('group_size').map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <select
                onChange={(e) => onChange('age_category', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Age Category</option>
                {uniqueValues('age_category').map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <select
                onChange={(e) => onChange('languages', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Languages</option>
                {uniqueValues('languages').map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <select
                onChange={(e) => onChange('destinations', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Destinations</option>
                {uniqueValues('destinations').map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <select
                onChange={(e) => onChange('attractions', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Attractions</option>
                {uniqueValues('attractions').map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    );
};

export default Filters;

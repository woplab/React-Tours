import React, { useState, useEffect } from 'react';
import Select from 'react-select';

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
        return Array.from(values).map(value => ({ value, label: value }));
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

    // Options with 'All' for select filters
    const allOption = { value: '', label: 'All' };
    const durationOptions = [allOption, ...uniqueValues('duration')];
    const groupSizeOptions = [allOption, ...uniqueValues('group_size')];
    const ageCategoryOptions = [allOption, ...uniqueValues('age_category')];
    const languagesOptions = [allOption, ...uniqueValues('languages')];
    const destinationsOptions = [allOption, ...uniqueValues('destinations')];
    const attractionsOptions = [allOption, ...uniqueValues('attractions')];

    return (
        <div className="flex flex-col border-light_gray border rounded-lg">
            <div className="bg-orange p-4 rounded-t-lg">
                <h3 className="text-lg text-white font-semibold mb-2">Filters</h3>
                <span className="text-white">Current price: {formatPrice(parseFloat(currentPrice))}</span>
                <div className="flex justify-between">
                    <span className="text-white font-bold">{formatPrice(minPrice)}</span>
                    <span className="text-white font-bold">{formatPrice(maxPrice)}</span>
                </div>
                <input
                    type="range"
                    min={minPrice.toString()}
                    max={maxPrice.toString()}
                    value={currentPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="border border-gray-300 rounded-md w-full bg-white"
                />
            </div>
            <div className="flex flex-col p-4 bg-white rounded-b-lg">
                <h3 className="text-lg font-semibold">Duration</h3>
                <Select
                    className="mb-4"
                    options={durationOptions}
                    onChange={(selectedOption) => selectedOption && onChange('duration', selectedOption.value as string)}
                    instanceId="duration-select"
                />
                <h3 className="text-lg font-semibold ">Group Size</h3>
                <Select
                    className="mb-4"
                    options={groupSizeOptions}
                    onChange={(selectedOption) => selectedOption && onChange('group_size', selectedOption.value as string)}
                    instanceId="group-size-select"
                />
                <h3 className="text-lg font-semibold">Age Category</h3>
                <Select
                    className="mb-4"
                    options={ageCategoryOptions}
                    onChange={(selectedOption) => selectedOption && onChange('age_category', selectedOption.value as string)}
                    instanceId="age-category-select"
                />
                <h3 className="text-lg font-semibold">Languages</h3>
                <Select
                    className="mb-4"
                    options={languagesOptions}
                    onChange={(selectedOption) => selectedOption && onChange('languages', selectedOption.value as string)}
                    instanceId="languages-select"
                />
                <h3 className="text-lg font-semibold">Destinations</h3>
                <Select
                    className="mb-4"
                    options={destinationsOptions}
                    onChange={(selectedOption) => selectedOption && onChange('destinations', selectedOption.value as string)}
                    instanceId="destinations-select"
                />
                <h3 className="text-lg font-semibold">Attractions</h3>
                <Select
                    className="mb-4"
                    options={attractionsOptions}
                    onChange={(selectedOption) => selectedOption && onChange('attractions', selectedOption.value as string)}
                    instanceId="attractions-select"
                />
            </div>
        </div>
    );
};

export default Filters;

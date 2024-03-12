'use client';
import Hero from "@/app/ui/home/hero";
import SpecialOffers from "@/app/ui/home/SpecialOffers";
import TourSlider from "@/app/ui/home/TourSlider";
import { useEffect, useState } from 'react';


export default function Home() {

    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch('/data/tours/special-tours.json');
                const data = await response.json();
                setTours(data.tours);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };


        fetchTours();
    }, []);

  return (
    <>
        <Hero/>
        <SpecialOffers tours={tours} />
        <TourSlider />
    </>
  );
}

// pages/index.tsx
'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppThunk, store } from '../app/store';
import { fetchTours } from '../app/reducers/toursSlice';
import Hero from "@/app/ui/home/Hero";
import SpecialOffers from "@/app/ui/home/SpecialOffers";
import TourSlider from "@/app/ui/home/TourSlider";
import TravelInfo from "@/app/ui/home/TravelInfo";
import TrendingDestinations from "@/app/ui/home/TrendingDestinations";
import BookNow from "@/app/ui/home/BookNow";
import TravelAtt from "@/app/ui/home/TravelAtt";
import Banner from "@/app/ui/home/Banner";
import ChooseTours from "@/app/ui/home/ChooseTours";
import TravelArticles from "@/app/ui/home/TravelArticles";
import Partners from "@/app/ui/home/Partners";

// Define typed hooks for useSelector
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Home() {
    const tours = useTypedSelector((state) => state.tours.tours);
    const dispatch = useDispatch<typeof store.dispatch>(); // Explicitly define dispatch type

    useEffect(() => {
        dispatch(fetchTours()); // Correctly dispatch fetchTours
    }, [dispatch]);

    return (
        <>
            <Hero />
            <SpecialOffers tours={tours} />
            <TourSlider />
            <TravelInfo />
            <TrendingDestinations />
            <BookNow />
            <TravelAtt />
            <Banner />
            <ChooseTours />
            <TravelArticles />
            <Partners />
        </>
    );
}

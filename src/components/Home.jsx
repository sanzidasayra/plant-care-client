import React from "react";
import Banner from "./Banner";
import { useLoaderData, useOutletContext } from "react-router";
import PlantsCard from "./plantsCard";
import SeasonalPlantCareTips from "./SeasonalPlantCareTips";
import PlantCareMythsDebunked from "./PlantCareMythsDebunked";

const Home = () => {
  const plants = useLoaderData();
  const { isDarkMode } = useOutletContext(); // Access dark mode context

  return (
    <div
      className={
        isDarkMode
          ? "dark:bg-gray-900 dark:text-gray-100"
          : "bg-green-100 text-gray-800"
      }
    >
      <Banner />
      <div className='mt-10 text-center p-10 mb-10'>
        <h1 className='lg:text-5xl text-3xl font-bold pb-2'>New Plants</h1>
        <p className='lg:text-xl text-md text-accent-content dark:text-gray-300'>
          Discover our latest additions! These fresh and vibrant plants have
          just been added to our collection. From colorful blooms to
          low-maintenance greens, explore the newest varieties and find the
          perfect plant companion for your space.
        </p>
      </div>

      <div
        id='cardSection'
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:border lg:p-15 justify-items-center items-center lg:bg-green-50 lg:border-green-300 lg:rounded-4xl rounded-xl lg:shadow-2xl
                dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg'
      >
        {plants.map((plant) => (
          <PlantsCard key={plant._id} plant={plant} />
        ))}
      </div>
      <SeasonalPlantCareTips />
      <PlantCareMythsDebunked />
    </div>
  );
};

export default Home;

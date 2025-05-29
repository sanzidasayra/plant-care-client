import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const PlantCardDetails = () => {
  const plant = useLoaderData();
  const navigate = useNavigate();

  if (!plant) {
    return (
      <div className='text-center mt-20 text-2xl text-red-600'>
        Plant not found
      </div>
    );
  }

  const {
    image,
    plantName,
    category,
    description,
    healthStatus,
    careLevel,
    wateringFrequency,
    lastWateredDate,
    nextWateringDate,
  } = plant;

  return (
    <div className='max-w-3xl mx-auto mt-10 p-6 border-green-300 rounded-xl shadow-xl bg-green-50'>
      <img
        className='w-full h-[300px] object-cover rounded-xl mb-6'
        src={image}
        alt={plantName}
      />
      <h2 className='text-3xl font-bold mb-2'>{plantName}</h2>
      <div className='flex flex-wrap gap-4 mb-4'>
        <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold'>
          {category}
        </span>
        <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold'>
          {careLevel}
        </span>
        <span className='bg-green-800 text-white px-3 py-1 rounded-full font-semibold'>
          {healthStatus}
        </span>
      </div>
      <p className='text-gray-700 mb-6'>{description}</p>

      <div className='grid grid-cols-2 gap-6 mb-6'>
        <div>
          <h3 className='text-xl font-semibold text-green-700'>
            Watering Frequency
          </h3>
          <p className='text-lg dark:text-gray-800'>{wateringFrequency} days</p>
        </div>
        <div>
          <h3 className='text-xl font-semibold text-green-700'>
            Next Watering
          </h3>
          <p className='text-lg dark:text-gray-800'>{nextWateringDate}</p>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-xl font-semibold text-green-700'>Last Watered</h3>
        <p className='text-lg dark:text-gray-800'>{lastWateredDate}</p>
      </div>

      <div className='text-center'>
        <button
          onClick={() => navigate("/#plant-cards")}
          className='px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-all'
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PlantCardDetails;

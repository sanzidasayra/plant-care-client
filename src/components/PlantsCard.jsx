import React from "react";
import { useNavigate } from "react-router";

const PlantsCard = ({ plant }) => {
  const {
    image,
    plantName,
    category,
    description,
    healthStatus,
    careLevel,
    _id,
  } = plant;
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (_id) {
      navigate(`/viewdetails/${_id}`);
    } else {
      console.error("Plant ID is missing!");
    }
  };

  return (
    <div className='card bg-base-100 dark:bg-gray-700 shadow-md transition-transform transform duration-300 hover:scale-105 hover:shadow-xl border border-green-300 dark:border-green-700 p-4 sm:p-5 rounded-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto h-full'>
      <figure className='p-2 sm:p-4 flex justify-center'>
        <img
          className='rounded-xl w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover'
          src={image}
          alt={plantName}
        />
      </figure>
      <div className='card-body -mt-2 space-y-3 flex flex-col'>
        <h2 className='card-title flex justify-between items-center text-lg sm:text-xl md:text-2xl'>
          <span className='font-bold dark:text-white'>{plantName}</span>
          <div className='text-white bg-green-800 dark:bg-green-900 px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm md:text-base'>
            {healthStatus}
          </div>
        </h2>
        <p className='text-sm sm:text-base text-gray-700 dark:text-gray-200'>
          {description}
        </p>
        <div className='flex justify-between text-xs sm:text-sm md:text-base'>
          <span className='text-green-700 dark:text-green-200 bg-green-100 dark:bg-green-900 px-2 sm:px-4 py-1 rounded-full font-semibold'>
            {category}
          </span>
          <span className='text-green-700 dark:text-green-200 bg-green-100 dark:bg-green-900 px-2 sm:px-4 py-1 rounded-full font-semibold'>
            {careLevel}
          </span>
        </div>
        <div className='flex justify-center mt-3'>
          <button
            onClick={handleNavigation}
            className='text-green-700 dark:text-green-200 border border-green-600 dark:border-green-400 px-4 sm:px-6 py-2 rounded-full font-semibold text-base sm:text-lg hover:bg-green-700 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-all duration-300'
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantsCard;

import React from "react";

const SeasonalPlantCareTips = () => {
  return (
    <div>
      <section className='py-10 bg-green-50 border border-green-200 rounded-3xl mt-10 shadow-xl dark:bg-green-900 dark:border-green-800'>
        <div className='container mx-auto text-center px-4'>
          <h2 className='text-3xl font-semibold text-green-600 mb-6 dark:text-green-300'>
            Seasonal Plant Care Tips
          </h2>
          <p className='text-lg text-gray-700 mb-10 dark:text-gray-200'>
            Learn how to take care of your plants through every season with our
            expert tips!
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-sm transition-shadow hover:shadow-lg dark:bg-green-700 dark:shadow-green-900'>
              <h3 className='text-xl font-semibold text-green-600 mb-4 dark:text-green-200'>
                Winter Care
              </h3>
              <p className='text-gray-600 dark:text-gray-100'>
                In the colder months, plants often need less water and more
                indirect light. Protect your tropical plants from cold drafts
                and consider using a humidity tray.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm transition-shadow hover:shadow-lg dark:bg-green-700 dark:shadow-green-900'>
              <h3 className='text-xl font-semibold text-green-600 mb-4 dark:text-green-200'>
                Spring Care
              </h3>
              <p className='text-gray-600 dark:text-gray-100'>
                Spring is the time for growth! Increase watering and make sure
                your plants are getting enough light. Prune dead leaves to help
                them thrive.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm transition-shadow hover:shadow-lg dark:bg-green-700 dark:shadow-green-900'>
              <h3 className='text-xl font-semibold text-green-600 mb-4 dark:text-green-200'>
                Summer Care
              </h3>
              <p className='text-gray-600 dark:text-gray-100'>
                Summer heat can dry out your plants quickly. Ensure regular
                watering, especially for plants in direct sunlight. Consider
                moving plants to cooler spots during the hottest parts of the
                day.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm transition-shadow hover:shadow-lg dark:bg-green-700 dark:shadow-green-900'>
              <h3 className='text-xl font-semibold text-green-600 mb-4 dark:text-green-200'>
                Fall Care
              </h3>
              <p className='text-gray-600 dark:text-gray-100'>
                As the weather cools, reduce watering frequency. Plants tend to
                go into dormancy, so avoid overwatering and keep them in a sunny
                location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeasonalPlantCareTips;

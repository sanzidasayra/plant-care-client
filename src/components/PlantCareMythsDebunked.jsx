import React from "react";

const PlantCareMythsDebunked = () => {
  const myths = [
    {
      title: "Myth 1: Watering daily is always good",
      fact: "Truth: Overwatering can lead to root rot. Most plants prefer soil to dry out slightly between waterings.",
    },
    {
      title: "Myth 2: Cacti don't need water",
      fact: "Truth: Cacti do need water, just less frequently. They thrive on a soak-and-dry cycle.",
    },
    {
      title: "Myth 3: All indoor plants need direct sunlight",
      fact: "Truth: Many indoor plants prefer indirect or low light. Direct sun can scorch some leaves.",
    },
    {
      title: "Myth 4: Yellow leaves always mean overwatering",
      fact: "Truth: Yellowing can happen from both overwatering and underwatering — check soil moisture first.",
    },
  ];

  return (
    <section className='py-10 bg-green-50 border border-green-200 rounded-3xl mt-10 shadow-xl dark:bg-green-900 dark:border-green-800'>
      <div className='container mx-auto text-center px-4'>
        <h2 className='text-3xl font-semibold text-green-600 mb-6 dark:text-green-300'>
          Plant Care Myths Debunked
        </h2>
        <p className='text-lg text-gray-700 mb-10 dark:text-gray-300'>
          Don’t fall for these common misconceptions! Learn the truth about
          plant care and grow healthier, happier plants.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
          {myths.map((myth, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left dark:bg-green-700 dark:shadow-green-950'
            >
              <h3 className='text-lg font-semibold text-green-700 mb-2 dark:text-green-200'>
                {myth.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>{myth.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantCareMythsDebunked;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const AllPlants = () => {
  const initialPlants = useLoaderData();
  const [plants, setPlants] = useState(initialPlants);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (order === "nearest") {
      const sorted = [...initialPlants].sort((a, b) => {
        const da = new Date(a.nextWateringDate || 0);
        const db = new Date(b.nextWateringDate || 0);
        return da - db;
      });
      setPlants(sorted);
    } else {
      setPlants(initialPlants);
    }
  };

  const fmtDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen'>
      <div className='mt-10 text-center p-5 mb-6'>
        <h1 className='text-3xl md:text-5xl font-bold text-gray-900 dark:text-green-200'>
          All Plants
        </h1>
        <p className='text-base md:text-xl mt-2 text-gray-700 dark:text-gray-300'>
          Explore our full collection of plants!
        </p>
      </div>

      <div className='mb-4 flex justify-end items-center'>
        <label htmlFor='sort' className='mr-2 text-gray-700 dark:text-gray-300'>
          Sort by Next Watering Date:
        </label>
        <select
          id='sort'
          value={sortOrder}
          onChange={handleSortChange}
          className='select select-bordered select-sm w-auto'
        >
          <option value=''>Default</option>
          <option value='nearest'>Nearest First</option>
        </select>
      </div>

      <div className='overflow-x-auto border border-green-300 dark:border-green-700 shadow-lg rounded-lg bg-white dark:bg-gray-800'>
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto'>
          <thead className='bg-green-100 dark:bg-green-900'>
            <tr>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-medium text-gray-700 dark:text-green-200'>
                No
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-medium text-gray-700 dark:text-green-200'>
                Plant Name
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-medium text-gray-700 dark:text-green-200'>
                Category
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-medium text-gray-700 dark:text-green-200'>
                Watering Frequency
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-medium text-gray-700 dark:text-green-200'>
                Next Watering Date
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-medium text-gray-700 dark:text-green-200'>
                Details
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
            {plants.map((plant, index) => (
              <tr
                key={plant._id}
                className='hover:bg-green-50 dark:hover:bg-green-950'
              >
                <td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
                  {index + 1}
                </td>
                <td className='px-4 py-3 flex items-center gap-3 text-sm text-gray-800 dark:text-green-100'>
                  <img
                    className='h-10 w-10 rounded-full object-cover hidden lg:inline border border-green-200 dark:border-green-700'
                    src={plant.image}
                    alt={plant.plantName}
                  />
                  {plant.plantName}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
                  {plant.category}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
                  {plant.wateringFrequency}
                </td>
                <td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
                  {plant.nextWateringDate
                    ? fmtDate(plant.nextWateringDate)
                    : "—"}
                </td>
                <td className='px-4 py-3'>
                  <button
                    onClick={() => navigate(`/viewdetails/${plant._id}`)}
                    className='btn btn-sm bg-green-100 text-green-700 border border-green-300
                               hover:bg-green-700 hover:text-white
                               dark:bg-green-900 dark:text-green-200 dark:border-green-700
                               dark:hover:bg-green-700 dark:hover:text-white'
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlants;

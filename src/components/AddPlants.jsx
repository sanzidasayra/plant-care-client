import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaChevronDown } from "react-icons/fa";

const AddPlants = () => {
  const [customFrequency, setCustomFrequency] = useState("");

  const handleAddPlant = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newPlant = Object.fromEntries(formData.entries());

    if (newPlant.wateringFrequency === "custom") {
      newPlant.wateringFrequency = newPlant.customWateringFrequency;
    }

    fetch("https://plant-care-server-plum.vercel.app/plants", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Plant added successfully.",
            icon: "success",
            draggable: true,
          });
          form.reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed to add plant.",
          icon: "error",
          text: error.message,
          draggable: true,
        });
      });
  };

  const handleWateringChange = (e) => {
    if (e.target.value === "custom") {
      setCustomFrequency("");
    } else {
      setCustomFrequency(e.target.value);
    }
  };

  return (
    <div className='max-w-7xl mx-auto bg-green-50 dark:bg-gray-900 p-15 mt-10 border border-green-300 dark:border-green-800 rounded-4xl shadow-2xl'>
      <div className='text-center space-y-4'>
        <h1 className='lg:text-6xl text-3xl font-bold text-gray-800 dark:text-green-200'>
          Add Plants
        </h1>
        <p className='mb-15 text-gray-700 dark:text-gray-300'>
          This plant is a beautiful addition to any home or garden...
        </p>
      </div>

      <form onSubmit={handleAddPlant}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              User Name
            </label>
            <input
              type='text'
              name='userName'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              placeholder='Enter your name'
              required
            />
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              User Email
            </label>
            <input
              type='email'
              name='userEmail'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              placeholder='Enter your email'
              required
            />
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Image
            </label>
            <input
              type='text'
              name='image'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              placeholder='Image URL'
              required
            />
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Plant Name
            </label>
            <input
              type='text'
              name='plantName'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              placeholder='Enter Plant name'
              required
            />
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Category
            </label>
            <div className='relative'>
              <select
                name='category'
                className='input w-full pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
                required
              >
                <option value='' disabled>
                  Select a category
                </option>
                <option value='succulent'>Succulent</option>
                <option value='fern'>Fern</option>
                <option value='flowering'>Flowering</option>
                <option value='cactus'>Cactus</option>
                <option value='bamboo'>Bamboo</option>
              </select>
              <FaChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-green-300' />
            </div>
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Description
            </label>
            <input
              type='text'
              name='description'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              placeholder='Write a description'
              required
            />
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Care Level
            </label>
            <div className='relative'>
              <select
                name='careLevel'
                className='input w-full pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
                required
              >
                <option value='' disabled>
                  Select care level
                </option>
                <option value='easy'>Easy</option>
                <option value='moderate'>Moderate</option>
                <option value='difficult'>Difficult</option>
              </select>
              <FaChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-green-300' />
            </div>
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Watering Frequency
            </label>
            <div className='relative'>
              <select
                name='wateringFrequency'
                className='input w-full pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
                required
                onChange={handleWateringChange}
              >
                <option value='' disabled>
                  Select watering frequency
                </option>
                <option value='3'>Every 3 days</option>
                <option value='5'>Every 5 days</option>
                <option value='7'>Every 7 days</option>
                <option value='10'>Every 10 days</option>
                <option value='14'>Every 14 days</option>
                <option value='custom'>Custom</option>
              </select>
              <FaChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-green-300' />
            </div>
            {customFrequency === "custom" && (
              <input
                type='number'
                name='customWateringFrequency'
                className='input w-full mt-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
                placeholder='Enter custom frequency in days'
                required
              />
            )}
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Last Watered Date
            </label>
            <input
              type='date'
              name='lastWateredDate'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              required
            />
          </fieldset>

          <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4'>
            <label className='label text-gray-800 dark:text-green-200'>
              Next Watering Date
            </label>
            <input
              type='date'
              name='nextWateringDate'
              className='input w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              required
            />
          </fieldset>
        </div>

        <fieldset className='fieldset bg-green-100 dark:bg-gray-800 border-base-300 dark:border-green-700 rounded-box border p-4 mt-6'>
          <label className='label text-gray-800 dark:text-green-200'>
            Health Status
          </label>
          <div className='relative'>
            <select
              name='healthStatus'
              className='input w-full pl-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 border-gray-300 dark:border-green-700'
              required
            >
              <option value='' disabled>
                Select health status
              </option>
              <option value='healthy'>Healthy</option>
              <option value='unhealthy'>Unhealthy</option>
              <option value='needsAttention'>Needs Attention</option>
            </select>
            <FaChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-green-300' />
          </div>
        </fieldset>

        <div className='flex justify-center mt-7'>
          <input
            type='submit'
            className='btn btn-wide md:btn-md bg-[#4CAF50] dark:bg-green-700 text-white hover:bg-[#1b3d1f] dark:hover:bg-green-900'
            value='Add Plant'
          />
        </div>
      </form>
    </div>
  );
};

export default AddPlants;

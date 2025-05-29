import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSystemUpdateAlt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const MyPlants = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("greenGuardianUser"));
    const userEmail = storedUser?.email;

    if (userEmail) {
      fetch(`http://localhost:3000/plants?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => setPlants(data))
        .catch((err) => {
          console.error("Failed to load plants:", err);
          Swal.fire("Error", "Failed to load your plants.", "error");
        });
    }
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/plants/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setPlants((prev) => prev.filter((p) => p._id !== id));
              Swal.fire("Deleted!", "Your plant has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete the plant.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen'>
      <div className='mt-10 text-center p-5 mb-10'>
        <h1 className='text-3xl md:text-5xl font-bold text-gray-900 dark:text-green-200'>
          My Plants
        </h1>
        <p className='text-base md:text-xl mt-2 text-gray-700 dark:text-gray-300'>
          Here are all the plants you've added.
        </p>
      </div>

      <div className='overflow-x-auto shadow-md border border-green-200 dark:border-green-700 rounded-lg min-h-[20rem] bg-white dark:bg-gray-800'>
        <table className='min-w-full divide-y divide-green-200 dark:divide-green-700 table-auto'>
          <thead className='bg-green-100 dark:bg-green-900'>
            <tr>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-semibold text-gray-700 dark:text-green-200'>
                No
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-semibold text-gray-700 dark:text-green-200'>
                Plant Name
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-semibold text-gray-700 dark:text-green-200'>
                Category
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-semibold text-gray-700 dark:text-green-200'>
                Watering
              </th>
              <th className='px-4 py-3 text-left text-sm lg:text-xl font-semibold text-gray-700 dark:text-green-200'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
            {plants.length > 0 ? (
              plants.map((plant, index) => (
                <tr
                  key={plant._id}
                  className='hover:bg-green-50 dark:hover:bg-green-950'
                >
                  <td className='px-4 py-3 text-sm text-gray-700 dark:text-gray-200'>
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
                  <td className='px-4 py-3'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleUpdate(plant._id)}
                        className='btn btn-sm text-green-700 bg-green-100 hover:bg-green-800 hover:text-white border border-green-300 dark:text-green-200 dark:bg-green-900 dark:hover:bg-green-700 dark:hover:text-white dark:border-green-700'
                      >
                        <MdSystemUpdateAlt size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className='btn btn-sm text-red-600 bg-red-100 hover:bg-red-800 hover:text-white border border-red-300 dark:text-red-300 dark:bg-red-900 dark:hover:bg-red-700 dark:hover:text-white dark:border-red-700'
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan='5'
                  className='text-center text-gray-500 dark:text-gray-400 py-6'
                >
                  No plants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPlants;

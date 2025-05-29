import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { RiArrowDownSLine } from "react-icons/ri";

const UpdatePlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/plants`)
      .then((res) => res.json())
      .then((data) => {
        const foundPlant = data.find((p) => p._id === id);
        setPlant(foundPlant);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedPlant = {
      plantName: form.plantName.value,
      image: form.image.value,
      category: form.category.value,
      wateringFrequency: form.wateringFrequency.value,
    };

    fetch(`http://localhost:3000/plants/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Plant updated successfully.", "success");
          navigate("/myplants");
        } else {
          Swal.fire("Info", "No changes made.", "info");
        }
      });
  };

  if (!plant) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className='max-w-xl mx-auto p-4'>
      <input
        defaultValue={plant.plantName}
        name='plantName'
        className='input input-bordered w-full mb-3'
      />

      <input
        defaultValue={plant.image}
        name='image'
        className='input input-bordered w-full mb-3'
      />

      <div className='relative '>
        <select
          name='category'
          className='input input-bordered w-full mb-3 pr-10'
          defaultValue={plant.category}
        >
          <option value='succulent'>Succulent</option>
          <option value='fern'>Fern</option>
          <option value='flowering'>Flowering</option>
        </select>
        <RiArrowDownSLine
          size={24}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
        />
      </div>

      <div className='relative'>
        <select
          name='wateringFrequency'
          className='input input-bordered w-full mb-3 pr-10'
          defaultValue={plant.wateringFrequency}
        >
          <option value='3'>Every 3 days</option>
          <option value='5'>Every 5 days</option>
          <option value='7'>Every 7 days</option>
        </select>
        <RiArrowDownSLine
          size={24}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
        />
      </div>

      <button type='submit' className='btn btn-primary w-full'>
        Update Plant
      </button>
    </form>
  );
};

export default UpdatePlant;

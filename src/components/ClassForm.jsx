import React, { useEffect, useState } from "react";

const ClassForm = ({ isOpen, onClose, onSubmit, classData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState([
    { startTime: "", endTime: "", capacity: "", slotsAvailable: "" },
  ]);

  useEffect(() => {
    if (classData) {
      setTitle(classData.title);
      setDescription(classData.description);
      setLocation(classData.location);
      setSchedule(classData.schedule);
    }
  }, [classData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, location, schedule });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {classData ? "Edit Class" : "Create Class"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Add fields for schedule, etc. */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            {classData ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 py-2 px-4 border border-gray-300 rounded hover:bg-gray-200 transition duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;

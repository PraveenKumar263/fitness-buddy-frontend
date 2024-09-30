import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  title,
  description,
  image,
  buttonText,
  buttonLink,
  disabled,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center">
      <div className="flex items-center justify-center h-48 w-full">
        <img className="h-full object-cover" src={image} alt={title} />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        {disabled ? (
          <p className="text-red-500 mb-2">This class is fully booked.</p>
        ) : (
          <button
            className="mt-3 py-2 px-4 rounded bg-indigo-700"
            onClick={() => navigate(buttonLink)}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;

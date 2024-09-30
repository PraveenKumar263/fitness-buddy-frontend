import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentClass } from "../features/class/classSlice";
import { extractDateFromUTC, extractTimeFromUTC } from "../utils/dateUtils";
import StarRating from "./StarRating";

const ClassCard = ({ classData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultImages = {
    yoga: "https://i.postimg.cc/0N1kwzHH/yoga-art.jpg",
    "strength training": "https://i.postimg.cc/jdNdd6MJ/strength-art.jpg",
    cardio: "https://i.postimg.cc/WzxLcyBf/cardio.jpg",
    other: "https://i.postimg.cc/Y95KJZKD/other-ex.jpg",
  };

  const handleClick = () => {
    dispatch(setCurrentClass(classData));
    navigate(`/dashboard/classes/${classData._id}`);
  };

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center">
      <div className="flex items-center justify-center h-48 w-full">
        <img
          className="h-full object-cover"
          src={defaultImages[classData.type] || defaultImages.other}
          alt={classData.title}
        />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{classData.title}</div>
        <p className="mt-2 text-gray-600">
          Date: {extractDateFromUTC(classData.startTime, timeZone)}
        </p>
        <p className="mt-2 text-gray-600">
          Start Time: {extractTimeFromUTC(classData.startTime, timeZone)}
        </p>
        <p className="mt-2 text-gray-600">
          End Time: {extractTimeFromUTC(classData.endTime, timeZone)}
        </p>
        <div className="flex mt-1">
          <StarRating rating={classData.rating || 0} />
        </div>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={handleClick}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ClassCard;

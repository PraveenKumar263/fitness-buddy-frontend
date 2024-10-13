import { useNavigate } from "react-router-dom";

const TrainerCard = ({ trainer, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center bg-white">
      <div className="flex items-center justify-center h-48 w-full">
        <img
          className="rounded-full object-cover w-36 h-44"
          src={
            trainer.user.profilePicture ||
            "https://i.postimg.cc/VsWFRGBJ/dummy-avatar.png"
          }
          alt={`${trainer.user.firstName} ${trainer.user.lastName}`}
        />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">
          {trainer.user.firstName} {trainer.user.lastName}
        </div>
        <p className="text-gray-600 text-base">{trainer.introduction}</p>
      </div>
      <div className="px-6 py-4">
        <button
          className="mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded"
          onClick={handleClick}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default TrainerCard;

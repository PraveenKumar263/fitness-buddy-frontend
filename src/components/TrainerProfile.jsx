import { useSelector } from "react-redux";
import { selectTrainer } from "../features/users/trainerSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainerProfile = () => {
  const navigate = useNavigate();
  const trainer = useSelector(selectTrainer);

  useEffect(() => {
    if (!trainer || !trainer._id) {
      navigate("/");
    }
  }, []);

  const {
    firstName,
    lastName,
    qualifications,
    expertise,
    specializations,
    introduction,
    photos,
    profilePicture,
    videos,
  } = trainer;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Back Button */}
        <button
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="flex justify-center">
          <img
            className="w-40 h-40 rounded-full"
            src={
              profilePicture || "https://i.postimg.cc/VsWFRGBJ/dummy-avatar.png"
            }
            alt={`${firstName} ${lastName}`}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 my-4">
          {firstName} {lastName}
        </h2>
        <p className="text-center mb-4">{introduction}</p>

        {qualifications.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Qualifications
            </h3>
            <ul className="list-disc list-inside">
              {qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
        )}

        {expertise.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Expertise</h3>
            <ul className="list-disc list-inside">
              {expertise.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Specialization section */}
        {specializations.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Specializations
            </h3>
            <ul className="list-disc list-inside">
              {specializations.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Photo section */}
        {photos.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Photos</h3>
            <div className="flex items-center justify-center">
              <button onClick={handlePrev} className="mr-4 text-blue-600">
                &lt; Prev
              </button>
              <img
                src={photos[currentPhotoIndex]}
                alt={`Trainer Photo ${currentPhotoIndex}`}
                className="w-full rounded-lg max-w-xs"
              />
              <button onClick={handleNext} className="ml-4 text-blue-600">
                Next &gt;
              </button>
            </div>
          </div>
        )}
        {/* Video section */}
        {videos.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Videos</h3>
            <div className="grid grid-cols-2 gap-4">
              {videos.map((video, index) => (
                <video key={index} controls className="w-full rounded-lg">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerProfile;

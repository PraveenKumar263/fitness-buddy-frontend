import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TrainerDetailsPage = () => {
  const { trainerId } = useParams();
  const trainer = useSelector((state) =>
    state.trainers.find((t) => t._id === trainerId)
  );

  if (!trainer) {
    return <div className="text-center p-4">Trainer not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Trainer Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            src={trainer.user.profilePicture}
            alt={trainer.user.firstName}
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {trainer.user.firstName} {trainer.user.lastName}
            </h2>
            <p className="text-gray-600">{trainer.user.email}</p>
          </div>
        </div>
        <p className="mb-4">
          <strong>Introduction:</strong> {trainer.introduction}
        </p>
        <p className="mb-4">
          <strong>Qualifications:</strong> {trainer.qualifications.join(", ")}
        </p>
        <p className="mb-4">
          <strong>Specializations:</strong> {trainer.specializations.join(", ")}
        </p>
        <p className="mb-4">
          <strong>Expertise:</strong> {trainer.expertise.join(", ")}
        </p>
        <div className="flex space-x-4">
          {trainer.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-32 h-32 object-cover rounded-md shadow-md"
            />
          ))}
        </div>
        <div className="mt-4">
          {trainer.videos.map((video, index) => (
            <div key={index} className="mb-4">
              <video
                controls
                src={video}
                className="w-full h-64 object-cover rounded-md shadow-md"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;

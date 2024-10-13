import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectUser, updateUserBasicInfo } from "../features/users/userSlice";
import SpinnerIcon from "./SpinnerIcon";
import TrainerProfileForm from "./TrainerProfileForm";
import UserProfileForm from "./UserProfileForm";
import {
  selectTrainer,
  updateTrainerInfo,
} from "../features/users/trainerSlice";
import { uploadImage } from "../services/fileUploadServices";
import userServices from "../services/userServices";
import trainerServices from "../services/trainerServices";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isBasicEditable, setIsBasicEditable] = useState(false);
  const [isTrainerEditable, setIsTrainerEditable] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const trainer = useSelector(selectTrainer);

  useEffect(() => {
    setProfilePicture(user.profilePicture);
  }, [user.profilePicture]);

  // Update User collection
  const saveUserInfo = async (data) => {
    try {
      await userServices.updateUserDetails(data);
    } catch (error) {
      setError("Failed to update user information. Please try again.");
    }
  };

  // Update trainer collection
  const saveTrainerInfo = async (data) => {
    try {
      await trainerServices.updateTrainer(data);
    } catch (error) {
      setError("Failed to update trainer specific data. Please try again.");
    }
  };

  const handleBasicSubmit = (values) => {
    setLoading(true);
    try {
      const newBasicInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      };
      saveUserInfo(newBasicInfo);
      dispatch(updateUserBasicInfo(newBasicInfo));
      setIsBasicEditable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleTrainerSubmit = (values) => {
    setLoading(true);
    try {
      const newTrainerInfo = {
        introduction: values.introduction,
        qualifications: values.qualifications,
        expertise: values.expertise,
        specializations: values.specializations,
        photos: values.photos,
        videos: values.videos,
      };
      saveTrainerInfo(newTrainerInfo);
      dispatch(updateTrainerInfo(newTrainerInfo));
      setIsTrainerEditable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 1 * 1024 * 1024; // 1 MB
      if (file.size > maxSize) {
        setError("File size exceeds 1 MB. Please choose a smaller file.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const uploadedImage = await uploadImage(file);
        const newLink = { profilePicture: uploadedImage.link };
        await userServices.updateProfilePicture(newLink);
        dispatch(updateUserBasicInfo(newLink));
        setProfilePicture(uploadedImage.link);
      } catch (error) {
        setError("Failed to upload image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user) return <SpinnerIcon />;

  const { _id, firstName, lastName, email, phone, role } = user;

  return (
    <section className="bg-white">
      <div className="max-w-4xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">User Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        <div className="flex justify-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
            id="profilePictureInput"
          />
          <label
            htmlFor="profilePictureInput"
            className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            {loading ? "Updating..." : "Change Profile Picture"}
          </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {/* User form */}
        <div className="mb-8 p-6 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <UserProfileForm
            initialValues={{
              firstName: firstName || "",
              lastName: lastName || "",
              email: email || "",
              phone: phone || "",
            }}
            onSubmit={handleBasicSubmit}
            onEdit={setIsBasicEditable}
            isEditable={isBasicEditable}
          />
        </div>

        {/* Trainer form */}
        {role === "trainer" && (
          <div className="mb-8 p-6 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Trainer Information</h3>
            <TrainerProfileForm
              initialValues={{
                introduction: trainer.introduction || "",
                qualifications: trainer.qualifications || [""],
                expertise: trainer.expertise || [""],
                specializations: trainer.specializations || [""],
                photos: trainer.photos || [""],
                videos: trainer.videos || [""],
              }}
              onSubmit={handleTrainerSubmit}
              onEdit={setIsTrainerEditable}
              isEditable={isTrainerEditable}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;

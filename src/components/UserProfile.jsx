import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser } from "../features/users/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  uploadImageToImgur,
  deleteImageFromImgur,
} from "../services/fileUploadServices";
import { userValidation } from "../validations/userValidation";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
    profilePicture: "",
    fitnessGoals: [],
    classTypes: [],
    preferredTimes: [],
    membershipPlan: "",
    membershipExpiration: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [currentDeleteHash, setCurrentDeleteHash] = useState("");

  useEffect(() => {
    if (user) {
      setInitialValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        profilePicture: user.profilePicture || "",
        fitnessGoals: user.fitnessGoals || [],
        classTypes: user.preferences?.classTypes || [],
        preferredTimes: user.preferences?.preferredTimes || [],
        membershipPlan: user.membership?.plan || "",
        membershipExpiration: user.membership?.expirationDate
          ? new Date(user.membership.expirationDate).toLocaleDateString()
          : "",
      });
      setProfilePicture(
        user.profilePicture || "https://i.postimg.cc/VsWFRGBJ/dummy-avatar.png"
      );
      setCurrentDeleteHash(user.deleteHash || "");
    }
  }, [user]);

  const handleSubmit = (values) => {
    dispatch(
      updateUser({ ...values, profilePicture, deleteHash: currentDeleteHash })
    );
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = (resetForm) => {
    resetForm();
    setIsEditable(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const { link, deleteHash } = await uploadImageToImgur(file);
        setProfilePicture(link);
        setCurrentDeleteHash(deleteHash);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleImageRemove = async () => {
    if (currentDeleteHash) {
      try {
        const success = await deleteImageFromImgur(currentDeleteHash);
        if (success) {
          setProfilePicture("");
          setCurrentDeleteHash("");
        }
      } catch (error) {
        console.error("Image deletion failed:", error);
      }
    }
  };

  if (!user) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="mb-6">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 rounded w-full mb-2"
        />
        {currentDeleteHash && (
          <button
            type="button"
            onClick={handleImageRemove}
            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Remove Image
          </button>
        )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, values, isSubmitting, resetForm }) => (
          <Form>
            <div className="mb-4">
              <label className="font-semibold block mb-1">First Name:</label>
              <Field
                type="text"
                name="firstName"
                className={`border p-2 rounded w-full ${
                  isEditable ? "border-gray-300" : "bg-gray-100"
                }`}
                onChange={handleChange}
                value={values.firstName}
                disabled={!isEditable}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold block mb-1">Last Name:</label>
              <Field
                type="text"
                name="lastName"
                className={`border p-2 rounded w-full ${
                  isEditable ? "border-gray-300" : "bg-gray-100"
                }`}
                onChange={handleChange}
                value={values.lastName}
                disabled={!isEditable}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold block mb-1">Email:</label>
              <Field
                type="email"
                name="email"
                className={`border p-2 rounded w-full ${
                  isEditable ? "border-gray-300" : "bg-gray-100"
                }`}
                onChange={handleChange}
                value={values.email}
                disabled={!isEditable}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold block mb-1">Phone:</label>
              <Field
                type="text"
                name="phone"
                className={`border p-2 rounded w-full ${
                  isEditable ? "border-gray-300" : "bg-gray-100"
                }`}
                onChange={handleChange}
                value={values.phone}
                disabled={!isEditable}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {isEditable ? (
                <>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => handleCancel(resetForm)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;

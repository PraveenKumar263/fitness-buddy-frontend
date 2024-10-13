import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { trainerValidation } from "../validations/userValidation";

const TrainerProfileForm = ({
  initialValues,
  onSubmit,
  onEdit,
  isEditable,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={trainerValidation}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ handleChange, handleSubmit, values, resetForm, setFieldValue }) => (
        <Form>
          {/* Introduction */}
          <div className="mb-4">
            <label
              htmlFor="introduction"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Introduction:
            </label>
            <Field
              as="textarea"
              name="introduction"
              id="introduction"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${isEditable ? "bg-white" : "bg-gray-100"}`}
              disabled={!isEditable}
            />
            <ErrorMessage
              name="introduction"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          {/* Qualifications */}
          <div className="mb-4">
            <label
              htmlFor="qualifications"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Qualifications:
            </label>
            <FieldArray name="qualifications">
              {({ push, remove }) => (
                <>
                  {values.qualifications.map((qual, index) => (
                    <div key={index} className="flex mb-2">
                      <Field
                        type="text"
                        name={`qualifications.${index}`}
                        id={`qualifications.${index}`}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${isEditable ? "bg-white" : "bg-gray-100"}`}
                        disabled={!isEditable}
                      />
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-2 text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-blue-600"
                    >
                      Add Qualification
                    </button>
                  )}
                </>
              )}
            </FieldArray>
            <ErrorMessage
              name="qualifications"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          {/* Expertise */}
          <div className="mb-4">
            <label
              htmlFor="expertise"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Expertise:
            </label>
            <FieldArray name="expertise">
              {({ push, remove }) => (
                <>
                  {values.expertise.map((exp, index) => (
                    <div key={index} className="flex mb-2">
                      <Field
                        type="text"
                        name={`expertise.${index}`}
                        id={`expertise.${index}`}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${isEditable ? "bg-white" : "bg-gray-100"}`}
                        disabled={!isEditable}
                      />
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-2 text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-blue-600"
                    >
                      Add Expertise
                    </button>
                  )}
                </>
              )}
            </FieldArray>
            <ErrorMessage
              name="expertise"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          {/* Specializations */}
          <div className="mb-4">
            <label
              htmlFor="specializations"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Specializations:
            </label>
            <FieldArray name="specializations">
              {({ push, remove }) => (
                <>
                  {values.specializations.map((spec, index) => (
                    <div key={index} className="flex mb-2">
                      <Field
                        type="text"
                        name={`specializations.${index}`}
                        id={`specializations.${index}`}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${isEditable ? "bg-white" : "bg-gray-100"}`}
                        disabled={!isEditable}
                      />
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-2 text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-blue-600"
                    >
                      Add Specialization
                    </button>
                  )}
                </>
              )}
            </FieldArray>
            <ErrorMessage
              name="specializations"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          {/* Photos */}
          <div className="mb-4">
            <label
              htmlFor="photos"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Photos (URLs):
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Please input only Direct Image URLs.
            </p>
            <div className="flex flex-wrap mb-4">
              {values.photos.map((photo, index) => (
                <div key={index} className="relative mr-2 mb-2">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-24 h-24 object-cover border rounded"
                  />
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "photos",
                          values.photos.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-0 right-0 text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditable && (
              <>
                <input
                  type="text"
                  placeholder="Enter photo URL"
                  className="border rounded p-2 mb-2"
                  onChange={(e) => setFieldValue("newPhotoUrl", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (values.newPhotoUrl) {
                      setFieldValue("photos", [
                        ...values.photos,
                        values.newPhotoUrl,
                      ]);
                      setFieldValue("newPhotoUrl", "");
                    }
                  }}
                  className="text-blue-600"
                >
                  Add Photo
                </button>
              </>
            )}
            <ErrorMessage
              name="photos"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          {/* Videos */}
          <div className="mb-4">
            <label
              htmlFor="videos"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Videos (URLs):
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Please input only YouTube video URLs.
            </p>
            <div className="flex flex-wrap mb-4">
              {values.videos.map((video, index) => (
                <div key={index} className="relative mr-2 mb-2">
                  {video.includes("youtube.com") ||
                  video.includes("youtu.be") ? (
                    <iframe
                      width="240"
                      height="180"
                      src={`https://www.youtube.com/embed/${video.split("v=")[1]?.split("&")[0]}`}
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls className="w-24 h-24 border rounded">
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "videos",
                          values.videos.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-0 right-0 text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditable && (
              <>
                <input
                  type="text"
                  placeholder="Enter video URL"
                  className="border rounded p-2 mb-2"
                  onChange={(e) => setFieldValue("newVideoUrl", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (values.newVideoUrl) {
                      setFieldValue("videos", [
                        ...values.videos,
                        values.newVideoUrl,
                      ]);
                      setFieldValue("newVideoUrl", "");
                    }
                  }}
                  className="text-blue-600"
                >
                  Add Video
                </button>
              </>
            )}
            <ErrorMessage
              name="videos"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            {isEditable ? (
              <>
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleSubmit}
                >
                  Save Trainer Info
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => {
                    resetForm();
                    onEdit(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm px-5 py-2.5 transition"
                onClick={() => onEdit(true)}
              >
                Edit Trainer Info
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TrainerProfileForm;

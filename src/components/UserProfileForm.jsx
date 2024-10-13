import { Formik, Form, Field, ErrorMessage } from "formik";
import { userValidation } from "../validations/userValidation";

const UserProfileForm = ({ initialValues, onSubmit, onEdit, isEditable }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidation}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ handleChange, handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {["firstName", "lastName", "email", "phone"].map((field) => (
              <div className="sm:col-span-2" key={field}>
                <label
                  htmlFor={field}
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                </label>
                <Field
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  id={field}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${isEditable ? "bg-white" : "bg-gray-100"}`}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            {isEditable ? (
              <>
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 rounded-lg px-5 py-2.5"
                  onClick={handleSubmit}
                >
                  Save Basic Info
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 rounded-lg px-5 py-2.5"
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
                className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-5 py-2.5"
                onClick={() => onEdit(true)}
              >
                Edit Basic Info
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;

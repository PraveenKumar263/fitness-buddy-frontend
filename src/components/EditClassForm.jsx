const EditClassForm = ({ originalDetails, onSave, onCancel }) => (
  <Formik
    initialValues={{
      title: originalDetails.title,
      description: originalDetails.description,
      location: originalDetails.location,
      type: originalDetails.type,
      startTime: formatDateForInput(originalDetails.startTime, timeZone),
      endTime: formatDateForInput(originalDetails.endTime, timeZone),
      capacity: originalDetails.capacity,
    }}
    validationSchema={classValidationSchema}
    onSubmit={onSave}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="mb-4">
          <label className="font-semibold">Title:</label>
          <Field
            type="text"
            name="title"
            className="border p-2 rounded w-full"
          />
          <ErrorMessage name="title" component="div" className="text-red-500" />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Description:</label>
          <Field
            as="textarea"
            name="description"
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Location:</label>
          <Field
            type="text"
            name="location"
            className="border p-2 rounded w-full"
          />
          <ErrorMessage
            name="location"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Type:</label>
          <Field
            type="text"
            name="type"
            className="border p-2 rounded w-full"
          />
          <ErrorMessage name="type" component="div" className="text-red-500" />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Start Time:</label>
          <Field
            type="datetime-local"
            name="startTime"
            className="border p-2 rounded w-full"
          />
          <ErrorMessage
            name="startTime"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">End Time:</label>
          <Field
            type="datetime-local"
            name="endTime"
            className="border p-2 rounded w-full"
          />
          <ErrorMessage
            name="endTime"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Capacity:</label>
          <Field
            type="number"
            name="capacity"
            className="border p-2 rounded w-full"
          />
          <ErrorMessage
            name="capacity"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            Save
          </button>
          <button
            type="button"
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default EditClassForm;

import * as Yup from "yup";

const classValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  location: Yup.string().required("Location is required"),
  type: Yup.string().required("Class type is required"),
  startTime: Yup.date().required("Start time is required"),
  endTime: Yup.date().required("End time is required"),
  capacity: Yup.number()
    .required("Capacity is required")
    .integer("Capacity must be an integer")
    .min(1, "Capacity must be atleast 1"),
});

export default classValidationSchema;

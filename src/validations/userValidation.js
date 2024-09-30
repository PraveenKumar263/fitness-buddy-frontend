import * as Yup from "yup";

const userValidation = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().optional(),
  profilePicture: Yup.string().url("Must be a valid URL").optional(),
  fitnessGoals: Yup.array().of(Yup.string()).optional(),
  classTypes: Yup.array().of(Yup.string()).optional(),
  preferredTimes: Yup.array().of(Yup.string()).optional(),
});

const trainerValidation = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().optional(),
  profilePicture: Yup.string().url("Must be a valid URL").optional(),
  fitnessGoals: Yup.array().of(Yup.string()).optional(),
  classTypes: Yup.array().of(Yup.string()).optional(),
  preferredTimes: Yup.array().of(Yup.string()).optional(),
});

export { userValidation, trainerValidation };

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
  qualifications: Yup.array()
    .of(Yup.string().required("Qualification is required"))
    .optional(),
  expertise: Yup.array()
    .of(Yup.string().required("Expertise is required"))
    .optional(),
  specializations: Yup.array()
    .of(Yup.string().required("Specialization is required"))
    .optional(),
  introduction: Yup.string().optional(),
  photos: Yup.array().of(Yup.string().url("Must be a valid URL")).optional(),
  videos: Yup.array().of(Yup.string().url("Must be a valid URL")).optional(),
});

export { userValidation, trainerValidation };

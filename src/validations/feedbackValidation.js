import * as Yup from "yup";

const feedbackValidationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
  comment: Yup.string()
    .max(200, "Comment must be at most 200 characters")
    .optional(),
});

export { feedbackValidationSchema };

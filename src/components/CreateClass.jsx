import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classServices from "../services/classServices";
import { useDispatch, useSelector } from "react-redux";
import { addClass } from "../features/class/classSlice";
import { useNavigate } from "react-router-dom";
import classValidationSchema from "../validations/classValidation";
import { selectTrainerId } from "../features/users/trainerSlice";

const CreateClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainerId = useSelector(selectTrainerId);

  const initialValues = {
    title: "",
    description: "",
    location: "",
    type: "",
    startTime: "",
    endTime: "",
    capacity: 1,
  };

  const handleSubmit = async (values) => {
    const startTime = new Date(values.startTime);
    const endTime = new Date(values.endTime);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (endTime > startTime) {
      const classData = {
        ...values,
        startTime: startTime.toUTCString(),
        endTime: endTime.toUTCString(),
        trainerId: trainerId,
        timeZone: timeZone,
      };

      const savedClass = await classServices.createClass(classData);
      dispatch(addClass(savedClass.data));
      navigate("/dashboard/my-classes");
    } else {
      alert("End time must be after start time.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Class</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={classValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Class Title
              </label>
              <Field
                name="title"
                type="text"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Location</label>
              <Field
                name="location"
                type="text"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Class Type
              </label>
              <Field
                as="select"
                name="type"
                className="border rounded p-2 w-full"
              >
                <option value="">Select Class Type</option>
                <option value="yoga">Yoga</option>
                <option value="strength training">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Start Time
              </label>
              <Field
                name="startTime"
                type="datetime-local"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="startTime"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Time</label>
              <Field
                name="endTime"
                type="datetime-local"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="endTime"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <Field
                name="capacity"
                type="number"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="capacity"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Create Class
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateClass;

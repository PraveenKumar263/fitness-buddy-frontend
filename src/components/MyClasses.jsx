import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../features/users/userSlice";
import {
  setClasses,
  setLoading,
  setError,
  deleteClass,
  selectClasses,
} from "../features/class/classSlice";
import classServices from "../services/classServices";
import { Link } from "react-router-dom";
import { selectTrainerId } from "../features/users/trainerSlice";
import { extractDateFromUTC, extractTimeFromUTC } from "../utils/dateUtils";
import ClassCard from "./classCard";

const MyClasses = () => {
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);
  const loading = useSelector((state) => state.class.loading);
  const error = useSelector((state) => state.class.error);
  const trainerId = useSelector(selectTrainerId);
  const isTrainer = useSelector(selectUserRole);

  useEffect(() => {
    const fetchMyClasses = async () => {
      if (classes.length > 0) return;
      dispatch(setLoading(true));
      try {
        if (isTrainer) {
          const response =
            await classServices.getAllClassesByTrainerId(trainerId);
          dispatch(setClasses(response.data || []));
        } else {
          dispatch(setError("You are not authorized to view this page."));
        }
      } catch (err) {
        dispatch(setError("Failed to load classes: " + err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMyClasses();
  }, [trainerId, isTrainer]);

  const handleDeleteClass = async (classId) => {
    await classServices.deleteClass(classId);
    dispatch(deleteClass(classId));
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Classes</h1>
      <Link
        to="/dashboard/create-class"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 inline-block"
      >
        Create New Class
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">
            No classes created yet.
          </p>
        ) : (
          classes.map((classItem) => (
            <ClassCard
              key={classItem._id}
              classData={classItem}
              onDelete={() => handleDeleteClass(classItem._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyClasses;

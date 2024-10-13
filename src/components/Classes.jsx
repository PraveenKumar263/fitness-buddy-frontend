import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClasses,
  setLoading,
  setError,
  selectClasses,
  selectLoading,
  selectError,
} from "../features/class/classSlice";
import classServices from "../services/classServices";
import ClassCard from "./ClassCard";

const Classes = () => {
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const fetchClasses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await classServices.getAllClasses();
        dispatch(setClasses(response.data || []));
      } catch (error) {
        dispatch(setError("Failed to load classes"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchClasses();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Available Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">
            Classes are not available at this moment.
          </p>
        ) : (
          classes.map((classItem) => (
            <ClassCard key={classItem._id} classData={classItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default Classes;

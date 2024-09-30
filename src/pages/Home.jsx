import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeaturedClassesStart,
  getFeaturedClassesSuccess,
  getFeaturedClassesFail,
  getFeaturedTrainersStart,
  getFeaturedTrainersSuccess,
  getFeaturedTrainersFail,
} from "../features/users/homeSlice";
import { setTrainer } from "../features/users/trainerSlice";
import classServices from "../services/classServices";
import trainerServices from "../services/trainerServices";
import SpinnerIcon from "../components/SpinnerIcon";
import Card from "../components/Card";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { featuredClasses, featuredTrainers, loading } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    const getData = async () => {
      dispatch(getFeaturedClassesStart());
      dispatch(getFeaturedTrainersStart());

      try {
        const classes = await classServices.getFeaturedClasses();
        dispatch(getFeaturedClassesSuccess(classes.data));

        const trainers = await trainerServices.getFeaturedTrainers();
        dispatch(getFeaturedTrainersSuccess(trainers.data));
      } catch (error) {
        dispatch(getFeaturedClassesFail(error.message));
        dispatch(getFeaturedTrainersFail(error.message));
      }
    };

    getData();
  }, [dispatch]);

  if (loading) {
    return <SpinnerIcon />;
  }

  return (
    <div>
      <header
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('https://i.postimg.cc/qMBxZsjj/home-1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-white text-5xl font-bold">
            Find Your Perfect Class Today!
          </h1>
          <Link
            to="/classes"
            className="mt-5 bg-indigo-700 text-white py-2 px-4 rounded"
          >
            Browse Classes
          </Link>
        </div>
      </header>

      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Classes
        </h2>
        <div className="flex justify-around">
          {featuredClasses.length > 0 ? (
            featuredClasses.map((item) => {
              const currentDate = new Date();
              const startTime = new Date(item.startTime); // Assuming item.startTime is in ISO format
              const isDisabled =
                item.slotsAvailable === 0 || currentDate > startTime;

              return (
                <Card
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  image={
                    item.image ||
                    "https://i.postimg.cc/VsWFRGBJ/dummy-avatar.png"
                  }
                  buttonText="Book Now"
                  buttonLink="/book"
                  disabled={isDisabled}
                />
              );
            })
          ) : (
            <p className="text-center">
              No featured classes available at the moment.
            </p>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          Meet Our Trainers
        </h2>
        <div className="flex justify-around">
          {featuredTrainers.length > 0 ? (
            featuredTrainers.map((item) => (
              <Card
                key={item._id}
                title={`${item.user.firstName} ${item.user.lastName}`}
                description={item.introduction}
                image={
                  item.profilePicture ||
                  "https://i.postimg.cc/VsWFRGBJ/dummy-avatar.png"
                }
                buttonText="View Profile"
                onClick={() => {
                  dispatch(setTrainer(item));
                  navigate(`/trainers/${item._id}`);
                }}
              />
            ))
          ) : (
            <p className="text-center">
              No featured trainers available at the moment.
            </p>
          )}
        </div>
      </section>

      <footer className="py-10 text-center bg-gray-200">
        <p>&copy; {new Date().getFullYear()} FitBuddy. All Rights Reserved.</p>
        <p>Images by Freepik & Pixabay</p>
      </footer>
    </div>
  );
};

export default Home;

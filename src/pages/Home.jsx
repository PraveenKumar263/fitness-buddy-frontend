const Home = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h4 className="text-2xl font-semibold text-gray-800">Home</h4>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">Welcome to the Review App</p>
            <p className="text-gray-600">
              This is a simple review app that allows users to register, login, and post reviews for the books they have read.
            </p>
            <p className="text-gray-500 text-sm italic">
              Click on the Register link in the navigation bar to create an account, or click on the Login link to sign in if you already have an account.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  
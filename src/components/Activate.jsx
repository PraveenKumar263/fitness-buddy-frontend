import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authServices from '../services/authServices';

const Activate = () => {
  const [statusMessage, setStatusMessage] = useState('Activating your account...');
  const [isActivationSuccessful, setIsActivationSuccessful] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      const token = searchParams.get('token');

      if (token) {
        try {
          const response = await authServices.activate({ token });
          setStatusMessage(response.data.message);
          setIsActivationSuccessful(true);
          setTimeout(() => navigate('/'), 1000);
        } catch (error) {
          if (error.response && error.response.data) {
            setStatusMessage(error.response.data.message || 'An error occurred. Please try again.');
          } else {
            setStatusMessage('An error occurred. Please try again.');
          }
        }
      }
    };

    activateAccount();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-4">{statusMessage}</h1>
        {!isActivationSuccessful && (
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Activate;

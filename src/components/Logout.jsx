import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await authServices.logout();
                
                navigate('/');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Logging Out...</h2>
            </div>
        </div>
    );
};

export default Logout;

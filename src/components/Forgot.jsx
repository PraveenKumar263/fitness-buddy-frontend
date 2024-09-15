import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setError('');

        try {
            const response = await authServices.forgot({ email });
            setMessage(response.data.message);
            setEmail('');
            setTimeout(() => navigate('/'), 30000);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
                setEmail('');
            }
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot your password?</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={email}
                                onChange={handleChange}
                            />
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Send Reset Link
                        </button>
                    </div>
                </form>

                {message && <p className="mt-2 text-center text-sm text-gray-500">{message}</p>}

                <p className="mt-10 text-center text-sm text-gray-500">
                    Remembered your password? <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

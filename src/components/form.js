import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        toast.success('Success: Logged in successfully!', {
          position: 'top-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: 'dark',
          transition: Bounce,
        });
        setErrorMessage('Logged In successfully!');
      });
    } catch (error) {
      toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: 'dark',
        transition: Bounce,
      });
      setErrorMessage('Please enter all the details properly!');
      console.log(error);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    duration={0.5}
    style={{ position: 'relative', zIndex: 1 }} // Ensure the text stays above other elements
    className="text-sm text-center mt-4"
    >
      <ToastContainer
        position="top-right"
        autoClose={7000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form className="mt-8 space-y-6  " onSubmit={handleLogin}>
        <div>
          <h2 className="text-3xl font-extrabold text-white">Sign in to your account</h2>
          <p className={`mt-2 ${errorMessage === 'Logged In successfully!' ? 'text-green-600' : 'text-red-600'}`}>
            {errorMessage}
          </p>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className=" bg-transparent mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className=" bg-transparent mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-400 hover:text-indigo-300 transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105"
          >
            Sign in
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Form;

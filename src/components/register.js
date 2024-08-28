import React, { useState } from 'react';
import { auth, storage } from '../firebase'; // Import your Firebase configuration
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [uid, setUid] = useState('');
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then((snap) => {
        const user = snap.user;

        const data = {
          Email: email,
          Password: password,
          FirstName: firstName,
          LastName: lastName,
          Profileimg: profileImage,
          userUid: user.uid,
          phone: phone,
          bod: '00/00/0000',
          followers:0,
          credit:100,
          bio:"pls add Your bio Now!",
          usedModels:0,
          jarvis:false,
          models:{
            
          }
        };

        props.sendData(data, user.uid);
        toast.success('Success: User registered successfully!', {
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

        setUid(user.uid);
        setErrorMessage('Success: User Registered');

        if (profileImage) {
          const fileref = ref(storage, `${user.uid}/profileimg.jpg` );
          uploadBytes(fileref, profileImage);
        } else {
          const fileref = ref(
            storage,
            user.uid + 'profile Image' + '/profileimg.jpg'
          );
          uploadBytes(
            fileref,
            'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=170667a&w=0&k=20&c=rNswkObDqGxgzw9FTAgGfbLCdl3kcMW6XrQRMZq_fE0='
          );
        }
      });
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(`Error: Please enter all details properly!`, {
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
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8"
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Register an account
        </h2>
        <p className="mt-2 text-center text-red-600">{errorMessage}</p>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Hide labels for input fields */}
            <div>
              <label htmlFor="name" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name=""
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name=""
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="bg-transparent mt-4 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name=""
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="bg-transparent mt-4 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name=""
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="bg-transparent mt-4 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name=""
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" bg-transparent mt-4 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name=""
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className=" bg-transparent mt-4 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
            <div>
              <label htmlFor="profileImage" className="sr-only">
                Upload Profile Image
              </label>
              <input
                id="profileImage"
                name=""
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className=" bg-transparent mt-4 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105 text-white"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform scale-100 transition-transform duration-500 ease-in-out hover:scale-105"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Register;

import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
import {onAuthStateChanged} from 'firebase/auth'

export default function FaceValidation() {
  const webcamRef = React.useRef(null);
  const nav = useNavigate();
  const [showFaceMessage, setShowFaceMessage] = useState(false);
  const [matchingStatus, setMatchingStatus] = useState('');
//https://youtube.com/shorts/5UlXLHHHpPM?si=KssRyQ2uicERjEwv
  useEffect(() => {
    nav("/home/main")
    const captureImage = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const blob = await fetch(imageSrc).then((res) => res.blob());
        const data = { blob: imageSrc, uid: auth.currentUser.uid };
        
        try {
          const response = await axios.post('http://34.131.167.210:8000/imgreco', data);
          return response.data;
        } catch (error) {
          console.error('Error sending image:', error);
          return 'Error';
        }
      }
    };

    const interval = setInterval(async () => {
      const res1 = await captureImage();
      if (res1 === 'matched') {
        setMatchingStatus('Matched');
        nav('/home'); // Navigate only on successful match
        clearInterval(interval);
      } else if (res1 === 'unmatched') {
        setMatchingStatus('Unmatched');
      } else {
        setShowFaceMessage(true);
      }
    }, 6000); // Reduced the interval to 6 seconds for quicker feedback

    onAuthStateChanged(auth, (user) => {
         

      if (user) {
       
        return;

      
        
      } else {
         nav('/')
      }
    });

    
    return () => clearInterval(interval);


    
  }, []);

  return(
    <>
    <div
        className="absolute inset-0 z-1 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/17/47/47/360_F_617474728_dEQbw855a41IUsKDpKdwkZTjgQ5I4geM.jpg")' }}
      />
    
    <div className= "absolute inset-0 bg-black opacity-50 z-10" />
{/* Header Section */}
<header className="z-20 fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between">
  <h1 className="text-3xl font-bold text-white">AI Nexuz</h1>
  <div className="flex items-center space-x-4">
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="bg-gray-800 bg-opacity-50 rounded-lg p-2 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent border-none focus:outline-none text-white"
      />
    </motion.div>
    <nav className="flex space-x-4">
      <a href="#" className="hover:text-gray-300 transition-colors duration-300 text-white"  onClick={()=> nav("/Validation")}>
        Home
      </a>
      <a href="#" className="hover:text-gray-300 transition-colors duration-300 text-white"  onClick={()=> nav("/Validation")}>
        Features
      </a>
      <a href="#" className="hover:text-gray-300 transition-colors duration-300 text-white"  onClick={()=> nav("/Validation")}>
        Solutions
      </a>
      <a href="#" className="hover:text-gray-300 transition-colors duration-300 text-white"  onClick={()=> nav("/Validation")}>
        About Us
      </a>
      <a href="#" className="hover:text-gray-300 transition-colors duration-300 text-white"  onClick={()=> nav("/Validation")}>
        Contact
      </a>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300" onClick={()=> nav("/Validation")}>
        Login
      </button>
    </nav>
  </div>
</header>
    <section className='flex flex-col items-center justify-center h-screen relative z-10 mt-3'>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center flex-col h-screen"
    >
      <h1 className="text-3xl mb-4 text-white">Validating......</h1>
      {showFaceMessage && <p className="text-red-500 mb-4">Please show your face properly or come in proper light.</p>}
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Webcam
          audio={false}
          width={320}
          height={240}
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          screenshotQuality={1}
        />
      </motion.div>
      
      <div className="mt-4 p-4  rounded-lg">
        <h2 className="text-xl mb-2 text-white">Matching Status:</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-semibold text-white"
        >
          {matchingStatus}
        </motion.p>
      </div>
    </motion.div>
    </section>
  </>
  );
}

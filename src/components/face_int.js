import React, { useEffect, useRef } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Adjust the path to firebase.js as needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {auth} from '../firebase'
import Webcam from 'react-webcam';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // Import Framer Motion
import { onAuthStateChanged } from 'firebase/auth';

const FaceIntegrate = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [image, setImage] = React.useState(false);

  const update = (imageBlob) => {
    const storageRef = ref(storage, `${auth.currentUser.uid}/Integration` + 'image.jpg');

    // Upload the image blob to Firebase Storage
    uploadBytes(storageRef, imageBlob).then((snap) => {    navigate('/validation');});

 // Redirect to validation page after image upload
  };

  const clickImg = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      try {
        await axios.post('http://34.131.167.210:8000/integrate', blob).then((res) => {
          const result = res.data;
          console.log(result);
          if (result === 'Found') {
            toast.success('Success: Your Face has been Integrated successfully!', {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 1,
              theme: 'light',
              transition: 'bounce',
            });
            update(blob);
          } else if (result === 'Not Found') {
            toast.error('Error: No face detected, please click photo properly!', {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 1,
              theme: 'light',
              transition: 'bounce',
            });
          } else if (result === 'Multiple Faces Found') {
            toast.error('Error: Multiple Faces found in an image!', {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 1,
              theme: 'light',
              transition: 'bounce',
            });
          }
        });
      } catch (error) {
        toast.error('error: ' + error, {
          position: 'top-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: 'light',
          transition: 'bounce',
        });
        console.error('Error sending image:', error);
        return 'Error';
      }
    }
  };

  const checkimg = () => {
    const imageRef = ref(storage, auth.currentUser.uid + '/Integrationimage.jpg');
    getDownloadURL(imageRef)
      .then(() => setImage(true))
      .catch(() => setImage(false));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
         

    if (user) {
     
      checkimg()

    
      
    } else {
        
    }
  })
 
  }, [image]);

  return image == true? navigate('/Validation'):(
    <section className="flex flex-col items-center justify-center h-screen relative z-10 mt-3">
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
    theme="light"
  />
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto p-4"
  >
    <h1 className="text-4xl font-bold mb-8 text-white mt-10">Face recognition integrate</h1>
    <div className="w-full flex items-center justify-center mb-8">
      <div className="w-64 h-64 border border-gray-300 rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          width={320}
          height={240}
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          screenshotQuality={1}
        />
      </div>
    </div>
    <motion.button
      onClick={clickImg}
      id="captureBtn"
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Capture Image
    </motion.button>
  </motion.div>
</section>

  );
};

export default FaceIntegrate;

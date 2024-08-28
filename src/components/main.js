import React,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase'
import {onAuthStateChanged} from 'firebase/auth'
import {storage} from '../firebase'
import {ref,getDownloadURL} from 'firebase/storage'
const MainScreen = () => {
    const nav = useNavigate()
    const [image,setImage] = React.useState(false)
    useEffect(()=>{
        

      onAuthStateChanged(auth, (user) => {
         

        if (user) {
         const ref3 = ref(storage,`${user.uid}/Integrationimage.jpg`) 
         getDownloadURL(ref3).then((snap)=>{
          setImage(true)
         }).catch((error)=>{
          setImage(false)
         })
         if(image){
          nav("/Validation");
         }
         else{
          nav("/Login")
         }
         
 
        
          
        } else {
           
        }
      });
 
      
    
  


    },[])
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans overflow-y-scroll">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/17/47/47/360_F_617474728_dEQbw855a41IUsKDpKdwkZTjgQ5I4geM.jpg")' }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Header Section */}
      <header className="z-20 fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Nexuz</h1>
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
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/Login")}>
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/Login")}>
              Features
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/Login")}>
              Solutions
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/Login")}>
              About Us
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/Login")}>
              Contact
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300" onClick={()=> nav("/Login")}>
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4"
        >
          Welcome to AI Nexuz
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-center mb-8"
        >
          Transforming industries with cutting-edge AI solutions.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          onClick={()=> nav("/Login")}
        >
          Get Started
        </motion.button>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 flex items-center text-white"
            >
              <div className="w-1/2 pr-6">
                <h3 className="text-xl font-bold mb-4">Machine Learning (ML)</h3>
                <p className="text-gray-300">
                  Harness the power of machine learning to analyze data and make predictions.
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src="https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg"
                  alt="Machine Learning"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>

            {/* Deep Learning (DL) Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 flex items-center text-white"
            >
              <div className="w-1/2 pr-6">
                <h3 className="text-xl font-bold mb-4">Deep Learning (DL)</h3>
                <p className="text-gray-300">
                  Dive into deep learning techniques for complex pattern recognition and decision making.
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src="https://cdn.educba.com/academy/wp-content/uploads/2020/01/Deep-Learning.jpg"
                  alt="Deep Learning"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>

            {/* Generative AI Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 flex items-center text-white"
            >
              <div className="w-1/2 pr-6">
                <h3 className="text-xl font-bold mb-4">Generative AI</h3>
                <p className="text-gray-300">
                  Explore generative AI models for creating content and generating new ideas.
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src="https://etimg.etb2bimg.com/photo/108387873.cms"
                  alt="Generative AI"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
            
            {/* New AI Application Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 flex items-center text-white"
            >
              <div className="w-1/2 pr-6">
                <h3 className="text-xl font-bold mb-4">Speech Recognition</h3>
                <p className="text-gray-300">
                  Enable voice-based interactions with advanced speech recognition technology.
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Speech Recognition"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 flex items-center text-white"
            >
              <div className="w-1/2 pr-6">
                <h3 className="text-xl font-bold mb-4">Chatbot Integration</h3>
                <p className="text-gray-300">
                Enhance customer service with AI-powered chatbots that provide instant support.
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src="https://skil.ai/wp-content/uploads/2021/09/Use-Cases-For-AI-Chatbots-In-The-Telecommunications-Industry-scaled.jpg"
                  alt="Speech Recognition"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 flex items-center text-white"
            >
              <div className="w-1/2 pr-6">
                <h3 className="text-xl font-bold mb-4">Price Predictions</h3>
                <p className="text-gray-300">
                 Predicts the right time and price to buy different things like property etc.
                </p>
              </div>
              <div className="w-1/2">
                <img
                  src="https://assets-global.website-files.com/60d07e2eecb304cb4350b53f/642d946942d00f31555fe73a_0412_predictive-analytics-in-business.jpg.webp"
                  alt="Speech Recognition"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-900">
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-white"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHHphghyfsZPHPPGN-bSFqqXtBCT1cEC9BKC7xyF1UBUVsP1cGRpsz7-NRNi-5BpbtjI&usqp=CAU"
                alt="Testimonial 1"
                className="rounded-full mb-4"
              />
              <p className="text-lg mb-4">
                "AI Nexuz has revolutionized our business operations. Their AI solutions have
                streamlined our processes and improved efficiency significantly."
              </p>
              <p className="text-sm text-gray-400">- John Doe, CEO of XYZ Corp</p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-white"
            >
              <img
                src="data:image/jpeg;base64,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"
                alt="Testimonial 2"
                className="rounded-full mb-4"
              />
              <p className="text-lg mb-4">
                "The AI models provided by AI Nexuz are cutting-edge. We've seen a significant
                increase in accuracy and performance since integrating their solutions."
              </p>
              <p className="text-sm text-gray-400">- Jane Smith, CTO of ABC Corp</p>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-white"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToCLg4LyNBZRjVyQcrO0i1iqFc9eTlgT4Nc9RgsgUY52kach7LJ8traHX1GV2qqMn2Utg&usqp=CAU"
                alt="Testimonial 3"
                className="rounded-full mb-4"
              />
              <p className="text-lg mb-4">
                "AI Nexuz's support team is top-notch. They are always responsive and provide
                excellent assistance whenever we need it."
              </p>
              <p className="text-sm text-gray-400">- Alex Johnson, Head of Operations at DEF Inc</p>
            </motion.div>
          </div>
        </div>
      </section>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience AI Excellence?</h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white hover:bg-gray-200 text-blue-700 font-bold py-2 px-4 rounded-full transition-all duration-300"
          onClick={()=> nav("/Login")}
        >
          Get Started
        </motion.button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 AI Nexuz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainScreen;

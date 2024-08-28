import React,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth,database,storage} from '../firebase'
import SideNavScreen from './sidenavbar'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { BrowserRouter, Route, Routes , Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileScreen from '../AI/profile' 
import {ref as dbRef, onValue} from 'firebase/database'
import Alert from '../AI/Alert';
import Popup from '../AI/setjarvis';


 

const Home = () => {
    const nav = useNavigate()
const [img,setImg] = React.useState("")
const [isPopupOpen, setIsPopupOpen] = React.useState(false);

const togglePopup = () => {
  setIsPopupOpen(!isPopupOpen);
};
    
  const fetchimg = ( )=>{

    const ref2 = ref(storage,auth.currentUser.uid + "/profileimg.jpg")
    getDownloadURL(ref2).then((snap)=>{
      console.log(snap)
      setImg(snap)
    }).catch(()=>{
       
      setImg("https://cdn-icons-png.flaticon.com/512/149/149071.png")
    })
  }

 
  useEffect(()=>{
    fetchimg()
    // toast.warning(`Warning: Please Set Up jarvis by clicking on the jarvis button at the navbar `, {
    //   position: 'bottom-right',
    //   autoClose: false,
    //   hideProgressBar: false,
    //   closeOnClick: false,
    //   pauseOnHover: true,
    //   draggable: false,
    //   progress: 1,
    //   theme: 'dark',
    //   transition: 'bounce',
    // });

  })
  return (
    <div className=" min-h-screen text-white font-sans overflow-y-scroll">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/17/47/47/360_F_617474728_dEQbw855a41IUsKDpKdwkZTjgQ5I4geM.jpg")' }}
      />
  <ToastContainer
    position="bottom-right"
    autoClose={false}
    limit={1}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    pauseOnFocusLoss
   
    pauseOnHover
    theme="dark"
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
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/home/main")}>
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/home/main")}>
              Features
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> togglePopup()}>
              Jarvis
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/home/about")}>
              About Us
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300"  onClick={()=> nav("/home/pricing")}>
              pricing
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300" onClick={async()=> await signOut(auth).then(nav('/'))}>
              LogOut
            </button>
          </nav>
          
        </div>
        
      </header>
      


 <style>
  {
    `
    .custom-scrollbar {
      scrollbar-width: none; /* For Firefox */
      -ms-overflow-style: none;  /* For Internet Explorer and Edge */
    }

    .custom-scrollbar::-webkit-scrollbar {
      display: none; /* For Chrome, Safari, and Opera */
    }
    `
  }
 </style>
      <section className="relative h-screen flex z-10">
     
  <div className="w-64">  {/* Set a fixed width for the side navigation */}
    <SideNavScreen className="overflow-y-hidden" image={img} />
  </div>

  <div className="flex-1 overflow-y-auto custom-scrollbar" style={{flexDirection:'column',display:'flex'}}  >  {/* Ensure the main content area fills the remaining space and is scrollable */}
  
    <Outlet />
    <Popup isOpen={isPopupOpen} onClose={togglePopup}>
        <h2>Translucent Popup</h2>
        <p>This is a translucent popup!</p>
      </Popup>
  </div>
 
</section>

  
       
    
      
    
   
 
 
 
 


 

     
      
    

      {/* Footer Section */}

    </div>
  );
};

export default Home;

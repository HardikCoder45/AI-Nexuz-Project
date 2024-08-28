import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { database, auth, storage } from '../firebase';
import { ref as dbRef, onValue, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileScreen = (props) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [pass,setPass] = useState("")
  const [credit, setCredit] = useState(0)
  const [followers,setFollow] = useState(0)
  const [model,setModel] = useState([])

  const fetch = () => {
    const ref1 = dbRef(database, "users/" + auth.currentUser.uid);
    onValue(ref1, (snap) => {
      const data = snap.val();
      setFirstName(data.FirstName);
      setLastName(data.LastName);
      setEmail(data.Email);
      setPhone(data.phone);
      setDob(data.bod);
      setBio(data.bio);
      setPass(data.Password)
      setCredit(data.credit)
      setFollow(data.followers)
      setModel(data.model)
    });
  };

  const handleSave = () => {
    const userRef = dbRef(database, "users/" + auth.currentUser.uid);
    const updateProfileData = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      phone: phone,
      bod: dob,
 
      Password: pass,
        userUid: auth.currentUser.uid,
         
         
          models:[],
          followers:followers,
          credit:credit,
          bio:bio,
      Profileimg: img
    };

    if (selectedFile) {
      const storageReference = storageRef(storage, `${auth.currentUser.uid}/profileimg.jpg`);
      uploadBytes(storageReference, selectedFile).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          updateProfileData.profilePicture = url;
          set(userRef, updateProfileData).then(() => {
            toast.success('Success: Your profile has been updated successfully!', {
              position: 'bottom-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 1,
              theme: 'light',
              transition: 'bounce',
            });
          }).catch((error) => {
            console.error("Error updating profile: ", error);
          });
        });
      });
    } else {
      set(userRef, updateProfileData).then(() => {
        toast.success('Success: Your profile has been updated successfully!', {
          position: 'bottom-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: 'dark',
          transition: 'bounce',
        });
      }).catch((error) => {
        console.error("Error updating profile: ", error);
      });
    }
  };

  useEffect(() => {
    const userProfile = {
      "name": "John Doe",
      "profilePicture": "https://via.placeholder.com/400x400",
      "email": "john.doe@example.com",
      "dob": "1990-01-01",
      "phone": "123-456-7890",
      "username": "johndoe",
      "bio": "AI enthusiast and software developer.",
      "modelsUsed": 5,
      "creditsLeft": 120,
      "contributedModels": [
        { id: 1, title: "Model 1", description: "Description of model 1", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Model 2", description: "Description of model 2", image: "https://via.placeholder.com/150" },
        { id: 3, title: "Model 3", description: "Description of model 3", image: "https://via.placeholder.com/150" }
      ]
    };
    setUser(userProfile);
    props.image();
const image90 = localStorage.getItem("image")
setImg(image90)
    fetch();
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="custom-scrollbar min-h-screen flex items-center py-3 bg-transparent text-white mt-5">
      <ToastContainer
    position="bottom-right"
    autoClose={7000}
    limit={1}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={true}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
  />
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: none; /* For Firefox */
            -ms-overflow-style: none;  /* For Internet Explorer and Edge */
          }

          .custom-scrollbar::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }

          .wh {
            width: 650px;
            height: 350px;
            margin-top: 20px;
          }
          .card {
            width: 300px;
            height: 200px;
            perspective: 1000px;
            align-self: center;
            align-items: center;
            margin-top: 10px;
          }
          
          .card-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.999s;
          }
          
          .card:hover .card-inner {
            transform: rotateY(180deg);
          }
          
          .card-front,
          .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
          }
          
          .card-front {
            background-color: transparent;
            color: #fff;
            display: flex;
            align-items: center;
            border: 2px solid white;
            border-radius: 10px;
            justify-content: center;
            font-size: 24px;
            transform: rotateY(0deg);
          }
          
          .card-back {
            background-color: transparent;
            color: #fff;
            display: flex;
            align-items: center;
            border: 2px solid white;
            border-radius: 10px;
            justify-content: center;
            font-size: 24px;
            transform: rotateY(180deg);
            backdrop-filter: blur(20px);
            box-shadow: 0px 0px 30px rgba(227,228,237,0.37);
            border: 2px solid rgba(255,255,255,0.18);
          }
          .checkbox {
            display: none;
          }
          
          .slider {
            width: 60px;
            height: 30px;
            background-color: lightgray;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: center;
            border: 4px solid transparent;
            transition: .3s;
            box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.25) inset;
            cursor: pointer;
          }
          
          .slider::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-color: #fff;
            transform: translateX(-30px);
            border-radius: 20px;
            transition: .3s;
            box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.25);
          }
          
          .checkbox:checked ~ .slider::before {
            transform: translateX(30px);
            box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.25);
          }
          
          .checkbox:checked ~ .slider {
            background-color: #2196F3;
          }
          
          .checkbox:active ~ .slider::before {
            transform: translate(0);
          }
          .toogle{
            algin-self:bottom;
            margin-top:400px;
            margin-right:10px;
          }
        `}
      </style>
      <motion.div
        className="flex w-full max-w-6xl mx-auto p-6 h-screen custom-scrollbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        
        <div className="w-2/3 pr-6 h-full overflow-y-scroll custom-scrollbar">
          <motion.img
            className="rounded-lg w-full h-auto mb-6 border border-gray-300 wh"
            src={img}
            alt={`${user.name}'s profile`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          {editMode && (
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="mb-4"
            />
          )}
          <div className="w-full text-left text-lg">
            <h1 className="text-4xl font-bold mb-2">{editMode ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-transparent border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              firstName
            )} {editMode ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-transparent border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              lastName
            )}</h1>
            <p className="mb-2"><strong>Username:</strong> {firstName + "'s Nexus"}</p>
            <p className="mb-2"><strong>Email:</strong>  
              {email}
             </p>
            <p className="mb-2"><strong>Phone:</strong> {editMode ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              phone
            )}</p>
            <p className="mb-2"><strong>Date of Birth:</strong> {editMode ? (
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-transparent border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              dob
            )}</p>
            <p className="mb-2"><strong>Bio:</strong> {editMode ? (
              <input
              type="text"
                value={bio}
                row={11}
                onChange={(e) => setBio(e.target.value)}
                className="bg-transparent border border-gray-300 rounded p-1 w-full"
              />
            ) : (
              bio
            )}</p>
            <p className="mb-2"><strong>Followers:</strong> {followers}</p>
            <p className="mb-2"><strong>Credits Left:</strong> {credit}</p>
            <p className="mb-2"><strong>Contributed Models:</strong> {"0"}</p>
          </div>
        </div>
<div className='toogle'>
  <span>{editMode ? "Save Changes" : "Edit Profile"} </span>
  <label class="switch">
    <input type="checkbox" class="checkbox"  checked={editMode} onChange={(e) => {
              if (editMode) {
                handleSave();
              }
              setEditMode(e.target.checked);
            }}  />
    <div class="slider" 
            ></div>
</label></div>
        <div className="w-1/3 border-l border-gray-300 pl-6 h-full overflow-y-scroll custom-scrollbar">
          <h2 className="text-3xl font-bold mb-4 mt-2">Contributed Models</h2>
          {user.contributedModels && user.contributedModels.map(model => (
            !model ? (
              <div>No contributed models found</div>
            ) : (
              <div className="card" key={model.id}>
                <div className="card-inner">
                  <div className="card-front">
                    <img src={model.image} alt="model" className="rounded-lg m-1 w-full h-full object-cover" />
                  </div>
                  <div className="card-back flex flex-col">
                    <h3 className="text-2xl font-bold mb-2">{model.title}</h3>
                    <p className="text-lg">{model.description}</p>
                    <p className="text-lg">{"by " + firstName + " " + lastName}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </motion.div>
       
    </div>
  );
};

export default ProfileScreen;

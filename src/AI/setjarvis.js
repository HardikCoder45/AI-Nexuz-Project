import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { ReactMediaRecorder } from 'react-media-recorder-2';
import { ref, uploadBytes,listAll,getDownloadURL,getBytes,getBlob, getStream } from "firebase/storage";
import { storage, auth } from '../firebase'; // Ensure the path is correct based on your project structure
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 
const Popup = ({ isOpen, onClose }) => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [complete, setComplete] = useState(false);
const[num,setNum ] = useState(0)
const[Links,setLinks] = useState([])
const[NegLinks,setNegLinks] = useState([])

  useEffect(  ()  => {// Create a reference under which you want to list
  //   const listRef = ref(storage, `${auth.currentUser.uid}/recordings`);
    
  //   // Find all the prefixes and items.
  //  list =  listAll(listRef)
  //   console.log(list)

  const abc3 = ref(storage, auth.currentUser.uid + "/recordings")
 
 
  // Find all the prefixes and items.
  listAll(abc3)
    .then((res) => {
 
     
         
        setNum(res.items.length)
       
       
     
     
      
   
      
        
      })
    
 const model_status =    axios.post("https://nexuz-backend-apvrad3wmq-em.a.run.app/check",{'uid':auth.currentUser.uid})
 console.log(model_status)
   
  }, []);

  useEffect(() => {
    if (num >= 100) {
      setComplete(true);
    }
  }, [recordings]);

  if (!isOpen) return null;


  const fetch_audios = ()=>{
    const abc = ref(storage, auth.currentUser.uid + "/recordings")
 
    const links = []
    // Find all the prefixes and items.
    listAll(abc)
      .then((res) => {
     
         
        setNum(res.items.length)
       
        res.items.forEach((index)=>{
     
          const refrence = ref(storage,  index._location.path_ )
          if (num == 100){
            getDownloadURL(refrence).then((byte)=>{
            
              links.push(byte)
           })
          }
        })
      }).catch((error) => {
        console.log(error)
      });
      setLinks(links)
    
    
      const abc2 = ref(storage, "negative/")
     
      const Neglinks = []
      // Find all the prefixes and items.
      listAll(abc2)
        .then((res) => {
       
    
         
         
          res.items.forEach((index)=>{
       console.log(index)
            const refrence2 = ref(storage,  index._location.path_ )
            if (num == 100){
              getDownloadURL(refrence2).then((byte)=>{
              
                Neglinks.push(byte)
             })
            }
          })  
        }).catch((error) => {
          console.log(error)
        });
    setNegLinks(Neglinks)

    if(Links.length === 100 & NegLinks.length === 200){
      return ("passed")
    }
    
  }
  const handleStop = (blobUrl, blob) => {
    const fileName = `recording-${num + 1}.wav`;
    const storageRef = ref(storage, `${auth.currentUser.uid}/recordings/${fileName}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
   

    setRecordings((prev) => [...prev, blob]);
    setIsRecording(false);
  };
 
  const startRecordingHandler = (startRecording, stopRecording) => {
    if (num < 100) {
      setIsRecording(true);
      startRecording();
      setTimeout(() => {
        stopRecording();
      }, 3000); // Record for 2 seconds 
    }
    else{
      setComplete(false)
    }
  };

  const completeSetupHandler = async () => {
   
 const checker = fetch_audios()

if (checker === "passed"){
  const data = {
    "links":Links,
    "neg_links":NegLinks,
    "uid":auth.currentUser.uid
    
  }
  await axios.post('https://nexuz-backend-apvrad3wmq-em.a.run.app/train_wake_word_model', data).then((res) => {console.log(res)})
  }
else {
  toast.warning('warning: Try After 3-4 seconds', {
    position: 'bottom-left',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: 'dark',
    transition: 'bounce',
  });
}
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="popup-content p-6 rounded-lg w-3/4 max-w-lg relative flex flex-col items-center">
      {/* <ToastContainer
    position="bottom-left"
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
  /> */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/location-tr-f72c5.appspot.com/o/1tSV6eAWolfqiP1zrI1wrcMwVas1%2Fgen_saved_images%2F856442944279.jpg?alt=media&token=d009c3fe-f45d-4286-b688-cb3f18d7e3da"
            alt="Setup Illustration"
            className="w-24 h-24 mb-4 rounded-lg"
          />
          <h1 className="text-2xl font-bold flex items-center mb-4 text-white">
            <FaMicrophone className="mr-2" /> Hey Nexuz
          </h1>
          <h2 className="text-xl font-bold flex items-center mb-2 text-white">
            Set up Nexuz now
          </h2>
          <p className="text-blue-300 mb-4 text-center">
            We need at least 100 recordings of you saying "Hey Nexuz" for 2 seconds each to train
            the model on your voice and accurately detect the wake word. - we expect no background disturbance.
            Try saying loud or slow or fast etc with your different voices for good training
          </p>
          {

            num === 100 ? (<button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mb-4"
              onClick={completeSetupHandler}
            >
              Complete SetUp
            </button>) :( <ReactMediaRecorder
            audio
            onStop={handleStop}
            
           
             
            render={({ startRecording, stopRecording }) => (
              <>
                
                  
                
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 mb-4"
                      onClick={() => startRecordingHandler(startRecording, stopRecording)}
                      disabled={isRecording || num >= 100}
                    >
                      {isRecording ? 'Recording...' : (num == 0 ? 'Start Recording' : `${num} / 100`)}
                    </button>
                    {isRecording && <div className="loader mb-4">Recording.....</div>}
                  </>
                
              
            )}
          />)
          }
         
          <p className="text-gray-300">Recordings: {num } / 100</p>
 
        </div>
      </div>
    </div>
  );
};

export default Popup;

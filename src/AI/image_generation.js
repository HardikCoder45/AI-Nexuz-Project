import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStorage, ref, uploadBytes, getDownloadURL,listAll } from 'firebase/storage';
import { storage,auth } from '../firebase'; // Adjust the path to firebase.js as needed
// import { ImageGenRequest } from './service_pb';
// import { MyServiceClient } from './service_grpc_web_pb';
// import grpc from "@grpc/grpc-js"
 
// const client = new MyServiceClient("https://localhost:8080",null,null);

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [model, setModel] = useState('stabilityai/stable-diffusion-xl-base-1.0');
  const [guidance, setGuidance] = useState(10); // Default guidance scale
  const [steps, setSteps] = useState(75); // Default number of steps
  const [generatedImage, setGeneratedImage] = useState("data:image/jpeg;base64,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");
  const [checkImage,setCheckImage] = useState(true)
  const [images, setImages] = useState([]) 

  const list = [1, 2, 3, 4, 5];

   const handleGenerateImage = async () => {
     setGeneratedImage("https://i.pinimg.com/originals/89/a8/06/89a8066b5292d2f2edd34470f46f6811.gif")

  //   const request = new ImageGenRequest();
  //   request.setModel(model);
  //   request.setQuery(prompt);
  //   request.setNegativeQuery(negativePrompt);
  //   request.setGuidance(guidance);
  //   request.setSteps(steps);

  //   client.imageGen(request, {}, (err, response) => {
  //     if (err) {
  //       console.error('Error:', err);
  //       return;
  //     }
       
      
  //     console.log(response.getResult())
  //   })
    try {

      const response = await axios.post('https://nexuz-backend-apvrad3wmq-em.a.run.app/image_gen', {
        query: prompt,
        model: model,
        negative_query: negativePrompt,
        guidance: parseFloat(guidance),
        steps: parseInt(steps),
      }) 
      const imageData = response.data; // Adjust according to the actual response structure
    
      if (imageData == "error"){
        toast.error(`Error: ${model} model is currently loading. `, {
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
        console.log(imageData,"error")
        setGeneratedImage("data:image/jpeg;base64,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")

      }
      else{
      
        setGeneratedImage(imageData); // Convert to base64 if necessary
        console.log(imageData)
      }

    } catch (error) {
      console.error(error);
      toast.error(`Error:${error} `, {
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
    }
  };
  const base64ToBlob = (base64String) => {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' });
  };
  const handleSaveImage = async () => {
    const number = Math.floor(Math.random() * 1000000000001);

    const storageRef = ref(storage, `${auth.currentUser.uid}`+"/gen_saved_images" + `/${number}.jpg`);
    console.log("saved")
 
    const blob = base64ToBlob(generatedImage)
    // Upload the image blob to Firebase Storage
    uploadBytes(storageRef, blob).then((snap) => {    
      console.log(snap )
      toast.success(`Success: Your Generated image has been saved in database. `, {
        position: 'top-right',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: 'dark',
        transition: 'bounce',
      });

    
  })


  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;


      link.download = 'generated_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const checkimg = async() => {
    const imageRef = ref(storage, auth.currentUser.uid + '/gen_saved_images');
    const res = await listAll(imageRef);
    
    // Array to store the download URLs
    const imageUrls = [];
    
    // Loop through each item
    for (const itemRef of res.items) {
      // Get the download URL
      const url = await getDownloadURL(itemRef);
      // Push the URL to the array
      imageUrls.push(url);
 

    }
    setImages(imageUrls) 
   
  };
React.useEffect(()=>{
checkimg()
 
})
  return (
    <div className="custom-scrollbar flex flex-row">
 
       <ToastContainer
    position="top-right"
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
          <div style={{display:'flex',flexDirection:'column'}}> 
      <motion.div 
        className="flex items-center bg-transparent text-white h-30 border-r border-white-100 margis"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        style={{display:'flex',flexDirection:'column'}}
      >
        <h2 className="savetxt">Saved Images</h2>{images.length > 0 ? (
        images.map((e, index) => (
          <motion.img
            
            className="imgs1"
            src={e}
            alt="Saved Thumbnail"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={()=>{setGeneratedImage(e)}}
          />
        ))
      ) : (
        <p>Loading images...</p>
      )}
      </motion.div>
     
      </div>
      <div className='m-3 flex border-r border-white-300 margis custom-scrollbar flex-col'>
        <h2 className="text-xl font-bold mb-4 flex savetxt">Image Generating</h2>
        <div className='text-l font-bold mb-4 flex'>
       
          Generated Image
        </div>

      
         <motion.img
          className="imgs2"
          src={generatedImage  }
          alt="Generated"
          attribute="a"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />  
        
        
      </div>

      <div className=' flex margis custom-scrollbar flex-col'>
        <h2 className="text-xl font-bold mb-4 flex savetxt">Prompt</h2>
        <div className="mb-2">
      
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-30 p-1 border border-gray-300 bg-transparent"
          >
            <option style={{ color: 'black' }} value="stabilityai/stable-diffusion-xl-base-1.0">stabilityai/stable-diffusion-xl-base-1.0 - limited</option>
            <option style={{ color: 'black' }} value="runwayml/stable-diffusion-v1-5">runwayml/stable-diffusion-v1-5 - limited</option>
            <option style={{ color: 'black' }} value="CompVis/stable-diffusion-v1-4">CompVis/stable-diffusion-v1-4 - limited</option>
            <option style={{ color: 'black' }} value="dall-e-2">Dall-e-2 - pro</option>
            <option style={{ color: 'black' }} value="dall-e-3">Dall-e-3 - pro</option>
         
          </select>
        </div>

        <div className="mb-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-20 p-2 border border-gray-300 rounded mb-4 bg-transparent"
            placeholder="Enter your prompt..."
          />
          {/* <h2 className="text-xl font-bold mb-4">Negative Prompt</h2> */}
          <textarea
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full h-10 p-2 border border-gray-300 rounded mb-4 bg-transparent"
            placeholder="Enter negative prompts..."
          />
        </div>

        <div className="mb-2">
          <label htmlFor="guidance" className="block text-white-200 font-bold mb-1">Guidance Scale</label>
          <input
            type="number"
            value={guidance}
            onChange={(e) => setGuidance(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-transparent"
            min="1"
            max="20"
            step="0.5"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="steps" className="block text-white-200 font-bold mb-1">Number of Steps</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 bg-transparent"
            min="1"
            max="150"
            step="1"
          />
        </div>

        <motion.button
          onClick={handleGenerateImage}
          className="container2 text-white font-bold py-2 px-4 c2 mb-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Image
        </motion.button>

        <motion.button
          onClick={handleSaveImage}
          className="container2 text-white font-bold py-2 px-4 c2 mb-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Image
        </motion.button>

        <motion.button
          onClick={handleDownloadImage}
          className="container2 text-white font-bold py-2 px-4 c2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Image
        </motion.button>
      </div>
    </div>
  );
};

export default ImageGeneration;


{/* <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Saved Images</h2>
      
      </div>
      <div className="w-1/3 p -4border-l border-gray-300">
      <h2 className="text-xl font-bold mb-4">Generated Image</h2>
        {generatedImage && (
          <img
            src={generatedImage}
            alt="Generated Image"
            className="w-full h-auto mb-4"
          />
        )}
        <h2 className="text-xl font-bold mb-4">Text Prompt</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-20  p-2 border border-gray-300 rounded mb-4"
          row={10}
          column={10}
          style={{backgroundColor:'transparent',}}
          type="text"
        />
        <h2 className="text-xl font-bold mb-4">Negative Prompt</h2>
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          className="w-full h-10 p-2 border border-gray-300 rounded mb-4"
          style={{backgroundColor:'transparent',}}
          row={10}
          column={10}
        />
        <button
          onClick={handleGenerateImage}
          className=" container2 text-white font-bold py-2 px-4  c2"
        >
          Generate Image
        </button>
        
       
      </div>
      <div className="w-1/6   border-l border-gray-300" >
        <h2 className="text-xl font-bold mb-4 flex">Properties</h2>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-30 p-2 border border-gray-300  "
            style={{backgroundColor:'transparent'}}
          >
            <option value="stable-diffusion">Stable Diffusion</option>
            <option value="other-model">Other Model</option>
          </select>

          
        </div>
        <div className="mb-4">
          <label
            htmlFor="numInstances"
            className="block text-gray-700 font-bold mb-2"
          >
            Number of Instances
          </label>
          <input
            type="number"
            value={numInstances}
            onChange={(e) => setNumInstances(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            style={{width:50,height:50}}
          />
        </div>
        <p className="text-gray-500">Estimated Time: {estimatedTime}</p>
        
        <button className="  text-white font-bold py-2 px-4   ml-4 container2 c2">
          Save Image
        </button>
        
         
         <button className="ml-1  text-white font-bold py-2 px-4 container2 c2 " >Download Image</button>
         </div> */}

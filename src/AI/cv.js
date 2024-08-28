 

import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../App.css'

const Cv = () => {
  const json =  [ 
    {'title':'Image Generation','path':'/home/image_gen', 'image':'https://textintoimages.com/images/text-to-image-og.png', 'description':'Text-to-image AI lets you create images from scratch using just a written description. Its like magic paintbrush that turns your words into pictures'},
    {'title':'Video Generation','path':'/home/image_gen', 'image':'https://cdn.prod.website-files.com/63da3362f67ed6f71c9489c1/63e4a38fdd5511bfc49277b8_tts-videoimg-1.jpg', 'description':'Breathe life into your text! Transform words into a captivating video experience. Animations, sound effects, and visuals bring your message to life, engaging viewers without narration or music.'},
    {'title':'Object Detection','path':'/home/image_gen', 'image':'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/22606/images/1446e76-f181-6047-4e73-8d8ba3c6a50e_object_detection_1.webp', 'description':'Object detection help to find and identify objects in images and videos.  Its like a computer vision/Eyes This is useful for things like self-driving cars, security systems, and even counting objects in a factory.'},
    {'title':'Image Question/Answering','path':'/home/image_gen', 'image':'https://www.prepostseo.com/imgs/social-imgs/image-to-text.png', 'description':'magine having a fun conversation where you can share ideas and questions using pictures! This technology lets you chat with AI assistants or friends through images, making communication more creative and engaging.'},
   ]
const nav = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex items-center justify-center"
       
    >
      {json.map((item, index) => (
    <div className='taskbt'>
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          key={index}
          onClick={()=>{nav(item.path)}}
          className="flex flex-col mb-4 button2"
        >
          <img
            src={item.image}
            alt={item.title}
            className=" image12   mb-2"
          />
          <Link to={item.path} className="text-white font-bold">
            {item.title}
          </Link>
          <p className="text-gray-300 txt2">{item.description}</p>
        </motion.div>
        </div>
      ))}
    </motion.div>
  
  );
};

export default Cv;
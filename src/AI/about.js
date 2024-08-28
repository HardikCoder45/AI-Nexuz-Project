import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-cover bg-center min-h-screen custom-scrollbar ">
      <div className="container mx-auto px-6 py-16 text-white">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Nexuz: About Us
        </motion.h1>
        
        <motion.div 
          className="flex mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.img 
            src="https://www.shutterstock.com/shutterstock/videos/1100731021/thumb/12.jpg?ip=x480" 
            alt="Feature 1" 
            className="w-1/2 rounded shadow-lg shadow-white border3" 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="w-1/2 pl-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-bold">Why AI Nexuz?</h2>
            <p className="mt-4">
              AI Nexuz is built on the principles of accessibility, collaboration, and innovation. Our mission is to democratize AI by providing an inclusive platform where users can access state-of-the-art models, contribute their own, and explore AI capabilities.
            </p>
            <p className="mt-4">
              <strong>Key Features:</strong>
              <ul className="list-none mt-2">
                <li>- Diverse AI Models: Access a wide range of models spanning NLP, computer vision, generative AI, and more.</li>
                <li>- User Contributions: Share your own AI models with the community and benefit from the collective expertise.</li>
                <li>- Generous Free Tier: Start with 100 free credits to explore our platform with no initial cost.</li>
                <li>- Transparent Pricing: Simple and clear pricing plans to fit your needs, with options for scalability.</li>
              </ul>
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex items-center mb-16"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div 
            className="w-1/2 pr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <h2 className="text-3xl font-bold">Our Policies</h2>
            <p className="mt-4">
              At AI Nexuz, we believe in transparency and fairness. Our policies are designed to ensure a positive and productive experience for all users.
            </p>
            <p className="mt-4">
              <strong>Usage Policy:</strong>
              <ul className="list-none mt-2">
                <li>- Free Credits: Every new user receives 100 credits for free, allowing you to test our models and features.</li>
                <li>- Credit System: Each task consumes a certain number of credits. Additional credits can be purchased as needed.</li>
                <li>- Contribution Policy: Contribute your models to the community and use others' models for free. This fosters a collaborative environment where everyone benefits.</li>
              </ul>
            </p>
          </motion.div>
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
              .border2{
                width:500px;
                height:300px;
                margin-top:10px
              }
              .border3{
                width:500px;
                height:300px;
              }
              .button2 {
                padding: 0.8em 1.8em;
                border: 2px solid #17C3B2;
                position: relative;
                overflow: hidden;
                background-color: transparent;
                text-align: center;
                text-transform: uppercase;
                font-size: 16px;
                transition: .3s;
                z-index: 1;
                font-family: inherit;
                color: #17C3B2;
                margin-left:40px;
                margin-top:60px;
                align-self:bottom;
               }
               
               .button2::before {
                content: '';
                width: 0;
                height: 300%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
                background: #17C3B2;
                transition: .5s ease;
                display: block;
                z-index: -1;
                
               }
               
               .button2:hover::before {
                width: 105%;
               }
               
               .button2:hover {
                color: #111;
               }
               
              `
            }
          </style>
          <motion.img 
            src="https://static.vecteezy.com/system/resources/previews/001/991/654/non_2x/policies-flat-design-concept-illustration-icon-insurance-claim-form-insurance-policy-user-agreement-health-insurance-business-rule-abstract-metaphor-can-use-for-landing-page-mobile-app-free-vector.jpg" 
            alt="Feature 2" 
            className="w-1/2 rounded shadow-lg shadow-white bg-gray-800 bg-opacity-80 border2" 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="mb-16 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
          <div className="flex justify-center">
            <motion.div 
              className="max-w-2xl rounded overflow-hidden shadow-lg text-left p-8 bg-gray-800 bg-opacity-80 border border-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              
              
              <img className="w-full mb-4 shadow-lg shadow-white" src="https://www.vendavo.com/wp-content/uploads/2023/03/List-pricing-header-1200-%C3%97-479-px.png" alt="Custom Plan"/>
              <div className="flex flex-row">
<div >    
                <div className="font-bold text-xl mb-2">Pay Per Credit</div>
              <p className="text-white text-base">Choose your credits at a competitive rate</p>
              <p className="text-white text-base">Price: $1 for 100 credits</p>
              <p className="text-white text-base">or $0.01 per credit</p>
              <p className="text-white text-base">Buy Now for at least $2</p>
              </div>
              <div>
              <button className='button2'> Buy Credits
</button>
              </div>
              </div>
              
           
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <motion.img 
            src="https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2016/04/benefitsofcollaboration.jpg" 
            alt="Feature 3" 
            className="w-1/2 rounded shadow-lg shadow-white border2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="w-1/2 pl-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            <h2 className="text-3xl font-bold">Contribute and Collaborate</h2>
            <p className="mt-4">
              AI Nexuz thrives on community contributions. Share your AI models with the community and gain recognition while helping others. Contributed models can be accessed and used by all users for free, promoting a spirit of collaboration and innovation.
            </p>
            <p className="mt-4">
              <strong>How to Contribute:</strong>
              <ul className="list-none mt-2">
                <li>- Upload Your Model: Use our easy-to-navigate interface to upload your AI models.</li>
                <li>- Share with the Community: Once approved, your model will be available for others to use.</li>
                <li>- Gain Recognition: Build your reputation and contribute to the collective knowledge of the community.</li>
              </ul>
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex items-center mb-16"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <motion.div 
            className="w-1/2 pr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
          >
            <h2 className="text-3xl font-bold">Professional and Engaging Experience</h2>
            <p className="mt-4">
              At AI Nexuz, we prioritize a professional and engaging user experience. Our platform is designed with the latest technologies, including React and Tailwind CSS, ensuring a seamless and visually appealing interface.
            </p>
            <p className="mt-4">
              <strong>Design and Usability:</strong>
              <ul className="list-none mt-2">
                <li>- Modern Interface: A clean, modern design that is easy to navigate.</li>
                <li>- Responsive Design: Our platform is fully responsive, ensuring a great experience on any device.</li>
                <li>- Interactive Elements: Engaging motion effects and interactive elements to enhance usability.</li>
              </ul>
            </p>
          </motion.div>
          <motion.img 
            src={`https://imageio.forbes.com/specials-images/imageserve/5eb6bb89170c9400064865a7/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds`}
            alt="Feature 4" 
            className="w-1/2 rounded shadow-lg shadow-white border2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="flex items-center mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 3.5 }}
        >
          <motion.div 
            className="w-1/2 pr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 4 }}
          >
            <h2 className="text-3xl font-bold">About the Founder</h2>
            <p className="mt-4">
              AI Nexuz was founded by Hardik Arora, a passionate AI enthusiast and developer with years of experience in the field. Hardik is dedicated to making AI accessible to everyone and fostering a collaborative community of AI professionals and enthusiasts.
            </p>
            <p className="mt-4">
              <strong>Contact Information:</strong>
              <ul className="list-none mt-2">
                <li>- Name: Hardik Arora</li>
                <li>- Email: arorahardik344@gmail.com</li>
                <li>- Social Media: Follow us on LinkedIn, Twitter, and Facebook for the latest updates.</li>
              </ul>
            </p>
          </motion.div>
          <motion.img 
            src="data:image/jpeg;base64,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"
            alt="Founder" 
            className="w-1/2 rounded shadow-lg shadow-white border2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 4.5 }}
        >
          <h2 className="text-3xl font-bold mb-8">Join Us Today</h2>
          <p>
            Experience the power of AI and become a part of a vibrant, collaborative community. Sign up today and start exploring AI Nexuz!
          </p>
        </motion.div>
        
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 5 }}
        >
          <p>&copy; 2024 AI Nexuz. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

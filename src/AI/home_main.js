import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, useFBX, useAnimations } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function ModelWithAnimations({ actionName }) {
  const animate = useRef();

  // Load models and animations
  const { scene: gltfScene } = useGLTF('/models/avatar.glb');
  const { animations: idle } = useFBX('/models/idle.fbx');
  const { animations: laughing } = useFBX('/models/Laughing.fbx');
  const { animations: angry } = useFBX('/models/angry.fbx');
  const { animations: dancing } = useFBX('/models/dancing.fbx');
  const { animations: Hi } = useFBX('/models/hi.fbx');

  const { actions } = useAnimations([...Hi,...idle, ...laughing, ...angry, ...dancing], animate);

  useEffect(() => {
    // Set animation names
    idle[0].name = "Idle";
    laughing[0].name = "Laughing";
    angry[0].name = "Angry";
    dancing[0].name = "Dancing";
    Hi[0].name = "Hi"

    // Play the idle animation by default
    if (actions.Idle) {
      actions.Idle.reset().play();
    }
  }, [idle, laughing, angry, dancing, actions,Hi]);

  useEffect(() => {
    if (actionName && actions[actionName]) {
      const selectedAction = actions[actionName];
      
      // Stop the idle animation
      actions.Idle.stop();
      
      // Play the selected animation
      selectedAction.play();
      selectedAction.clampWhenFinished = true;
      selectedAction.loop = THREE.LoopOnce;

      // Add an event listener for when the animation finishes
      selectedAction.getMixer().addEventListener('finished', () => {
        actions.Idle.reset().play();
      });
    }
  }, [actionName, actions]);

  return (
    <group ref={animate} dispose={null}   >
      <primitive object={gltfScene} scale={1.5} position={[-2,-1.5,0.3]}  />
    </group>
  );
}

function HomeMain() {
  const [inputValue, setInputValue] = useState('');
  const [action, setAction] = useState('Idle');

  const handleSubmit = () => {
    const formattedAction = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    setAction(formattedAction);
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex items-center justify-center"
      >
        {/* Main content */}
      </motion.div>

      <Canvas camera={{ position: [-1.5,0.2,5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={1} color="#ffffff" />
        <directionalLight intensity={2} position={[2, 2, 5]} color="#ffffff" castShadow />
        <pointLight intensity={1} position={[-2, 2, 4]} color="#ffdddd" />
        <pointLight intensity={1} position={[3, -2, 2]} color="#ddddff" />

        <Suspense fallback={null}>
          <ModelWithAnimations actionName={action} />
        </Suspense>

 
      </Canvas>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full absolute bottom-0 flex items-center justify-center p-4"
      >
        <input
          type="text"
          placeholder="Enter your action here (Laughing, Angry, Dancing)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-4 bg-transparent text-white border border-white rounded-lg outline-none"
        />
        <motion.button
          whileHover={{ backgroundColor: 'white', color: 'black' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="ml-4 px-6 py-3 text-white bg-transparent border-2 border-white rounded-lg transition-all duration-300"
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HomeMain;

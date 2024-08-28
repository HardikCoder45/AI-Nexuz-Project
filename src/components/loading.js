import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Loading() {
  const nav = useNavigate();

  const checkIfLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        nav("/home");
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <img
        className="w-32 h-32 animate-spin"
        src="https://media.tenor.com/guhB4PpjrmUAAAAM/loading-loading-gif.gif"
        alt="Loading"
      />
    </div>
  );
}

export default Loading;

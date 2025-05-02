// src/components/CircleAnimation.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Woman from '../assets/medium-shot-woman-reading-magazine-smartphone.jpg'
import Med from '../assets/medicine-bottles-tablets-wooden-desk.jpg'
import Gst from '../assets/GST CAM 939-10.jpg'
import Doc from '../assets/job-position-beside-nurse.jpg'
import Stuff from '../assets/about.jpg'

const CircleAnimation = () => {
  // Tableau d'images pour l'exemple (remplacez par vos propres images)
  const images = [
    Woman, // Image principale
    Med,   // Nord
    Gst,   // Est
    Doc,   // Sud
    Stuff, // Ouest
  ];
  
  useEffect(() => {
    console.log("Chemins des images :", images);
  }, []);

  // État pour suivre si l'animation a commencé
  const [isAnimating, setIsAnimating] = useState(false);

  // Déclencher l'animation automatiquement après le chargement du composant
  useEffect(() => {
    // Attendre un petit délai avant de démarrer l'animation pour que l'utilisateur puisse voir l'état initial
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Positions des cercles quand ils sont cachés (superposés sur le cercle principal)
  const hiddenPosition = { x: 0, y: 0, scale: 0 };

  // Positions des cercles quand ils sont visibles (aux 4 points cardinaux)
  const visiblePositions = [
    { x: 0, y: -150, scale: 1 },  // Nord
    { x: 150, y: 0, scale: 1 },   // Est
    { x: 0, y: 150, scale: 1 },   // Sud
    { x: -150, y: 0, scale: 1 },  // Ouest
  ];

  // Options d'animation
  const transition = {
    duration: 1,
    ease: "easeInOut",
    repeat: Infinity, // Animation continue
    repeatType: "reverse",
    repeatDelay: 2
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-full md:h-full max-w-lg max-h-lg">
        {/* Cercle principal */}
        <motion.div 
          className="absolute left-1/2 top-1/2 rounded-full overflow-hidden shadow-lg"
          style={{ 
            width: "300px", 
            height: "500px",
            marginLeft: "-175px", // Moitié de la largeur pour centrer
            marginTop: "-200px"   // Moitié de la hauteur pour centrer
          }}
          animate={isAnimating ? { 
            width: "500px", 
            height: "500px", 
            marginLeft: "-100px", // Mise à jour du margin pour le centrage
            marginTop: "-100px"   // Mise à jour du margin pour le centrage
          } : {}}
          transition={transition}
        >
          <img 
            src={images[0]} 
            alt="Image principale"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Les 4 cercles aux points cardinaux */}
        {visiblePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 rounded-full overflow-hidden bg-white shadow-lg"
            style={{ 
              width: "150px", 
              height: "150px",
              marginLeft: "-75px", // Moitié de la largeur pour centrer
              marginTop: "-75px"   // Moitié de la hauteur pour centrer
            }}
            initial={hiddenPosition}
            animate={isAnimating ? {
              x: position.x,
              y: position.y,
              scale: position.scale
            } : hiddenPosition}
            transition={{
              ...transition,
              delay: 0.2 * (index + 1) // Ajoute un délai différent pour chaque cercle
            }}
          >
            <img 
              src={images[index + 1]} 
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CircleAnimation;
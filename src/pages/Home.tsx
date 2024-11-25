import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogoClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-gradient bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-48 h-48 mb-8 relative cursor-pointer"
        onClick={handleLogoClick}
      >
        <AnimatePresence>
          {isAnimating && (
            <>
              {/* Burst particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5],
                    opacity: [1, 0],
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 150 - 20],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 150],
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
              ))}
              
              {/* Sparkles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 120 - 15],
                    y: [0, Math.sin(i * 30 * Math.PI / 180) * 120],
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: Math.random() * 0.3,
                    ease: "easeOut"
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              ))}
              
              {/* Ripple effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: [0.8, 2.3],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-white"
              />
            </>
          )}
        </AnimatePresence>

        <motion.img 
          src="/hi-logo.png" 
          alt="Hi! Logo" 
          className="w-full h-full object-contain relative z-10"
          animate={isAnimating ? {
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, -10, 10, -5, 0],
          } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-6xl font-bold text-white text-center mb-4"
      >
        ¡Bienvenido a Hi!
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl text-white text-center mb-8 max-w-2xl"
      >
        Donde tus ideas cobran vida.
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/conocenos')}
        className="bg-[#FF00AA] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FF00AA]/90 transition-colors"
      >
        Saber más
      </motion.button>
    </div>
  );
};

export default Home;

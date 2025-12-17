import { motion } from 'framer-motion';
import { useState } from 'react';
import memenetLogo from '@/assets/memenet-logo.jpg';

const HeroSection = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);

  const emojis = ['🚀', '💎', '🔥', '⭐', '🎉', '💰', '🌙', '✨'];

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 1000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Neural sphere background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(160 92% 51% / 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Flying emojis on click */}
      {showEmoji && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-4xl pointer-events-none z-50"
              initial={{ 
                opacity: 1, 
                scale: 0.5,
                x: 0,
                y: 0 
              }}
              animate={{ 
                opacity: 0, 
                scale: 1.5,
                x: (Math.random() - 0.5) * 300,
                y: -200 - Math.random() * 100,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                left: '50%',
                top: '35%',
              }}
            >
              {emojis[i % emojis.length]}
            </motion.span>
          ))}
        </>
      )}

      {/* Logo */}
      <motion.div
        className="relative mb-8 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onHoverStart={() => setIsLogoHovered(true)}
        onHoverEnd={() => setIsLogoHovered(false)}
        onClick={handleLogoClick}
      >
        {/* Spinning ring */}
        <motion.div
          className="absolute -inset-4 rounded-full border-4 border-dashed border-neon-green/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Pulsing outer ring */}
        <motion.div
          className="absolute -inset-8 rounded-full border-2 border-neon-cyan/30"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(135deg, hsl(45 100% 50% / 0.5) 0%, hsl(160 92% 51% / 0.4) 50%, hsl(265 100% 64% / 0.4) 100%)',
          }}
          animate={{
            scale: isLogoHovered ? [1, 1.4, 1.2] : [1, 1.2, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: isLogoHovered ? 0.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.img
          src={memenetLogo}
          alt="$MEMENET Logo"
          className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-full"
          animate={{
            boxShadow: isLogoHovered 
              ? '0 0 60px hsl(45 100% 50% / 0.8), 0 0 120px hsl(160 92% 51% / 0.6), 0 0 180px hsl(265 100% 64% / 0.4)'
              : [
                  '0 0 30px hsl(45 100% 50% / 0.5), 0 0 60px hsl(160 92% 51% / 0.3)',
                  '0 0 50px hsl(45 100% 50% / 0.7), 0 0 100px hsl(160 92% 51% / 0.5)',
                  '0 0 30px hsl(45 100% 50% / 0.5), 0 0 60px hsl(160 92% 51% / 0.3)',
                ],
            rotate: isLogoHovered ? [0, -5, 5, -5, 5, 0] : 0,
            scale: isLogoHovered ? 1.1 : 1,
          }}
          transition={{
            duration: isLogoHovered ? 0.5 : 2,
            repeat: isLogoHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          whileTap={{ scale: 0.9, rotate: 360 }}
        />

        {/* Click counter badge */}
        {clickCount > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-neon-green text-cyber-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={clickCount}
          >
            {clickCount}
          </motion.div>
        )}
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="gradient-text">$MEMENET</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="font-display text-xl md:text-3xl text-neon-cyan neon-text-cyan mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Where Memes Meet AI
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.button
          className="btn-hero rounded-xl glitch-hover"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter the Meme Network
        </motion.button>
        <motion.button
          className="btn-hero-secondary rounded-xl glitch-hover"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Meme Galaxy
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-neon-green/50 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-neon-green"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

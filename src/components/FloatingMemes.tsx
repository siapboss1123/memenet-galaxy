import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import popcatLogo from '@/assets/popcat-logo.png';
import bonkLogo from '@/assets/bonk-logo.png';
import dogeLogo from '@/assets/doge-logo.webp';
import pepeLogo from '@/assets/pepe-logo.png';
import shibaLogo from '@/assets/shiba-logo.png';

const memes = [
  { src: shibaLogo, name: 'Shiba', emoji: '🐕' },
  { src: pepeLogo, name: 'Pepe', emoji: '🐸' },
  { src: dogeLogo, name: 'Doge', emoji: '🌙' },
  { src: bonkLogo, name: 'Bonk', emoji: '🔨' },
  { src: popcatLogo, name: 'Popcat', emoji: '🍿' },
];

const FloatingMeme = ({ 
  src, 
  name, 
  emoji,
  index, 
  mouseX, 
  mouseY 
}: { 
  src: string; 
  name: string; 
  emoji: string;
  index: number;
  mouseX: number;
  mouseY: number;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [bounceCount, setBounceCount] = useState(0);

  const positions = [
    { x: '5%', y: '20%' },
    { x: '85%', y: '15%' },
    { x: '90%', y: '60%' },
    { x: '8%', y: '70%' },
    { x: '75%', y: '85%' },
  ];

  const pos = positions[index % positions.length];
  
  const offsetX = (mouseX - 0.5) * 30 * (index % 2 === 0 ? 1 : -1);
  const offsetY = (mouseY - 0.5) * 30 * (index % 2 === 0 ? -1 : 1);

  const handleClick = () => {
    setIsClicked(true);
    setShowEmoji(true);
    setBounceCount(prev => prev + 1);
    setTimeout(() => {
      setIsClicked(false);
      setShowEmoji(false);
    }, 800);
  };

  return (
    <motion.div
      className="fixed z-20 cursor-pointer pointer-events-auto"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: offsetX,
        y: offsetY,
      }}
      transition={{ 
        opacity: { duration: 0.5, delay: index * 0.2 },
        scale: { duration: 0.5, delay: index * 0.2 },
        x: { type: 'spring', stiffness: 50, damping: 20 },
        y: { type: 'spring', stiffness: 50, damping: 20 },
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
    >
      {/* Floating emoji on click */}
      {showEmoji && (
        <motion.span
          className="absolute -top-8 left-1/2 text-3xl z-50"
          initial={{ opacity: 1, y: 0, x: '-50%' }}
          animate={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          {emoji}
        </motion.span>
      )}

      {/* Bounce counter */}
      {bounceCount > 0 && (
        <motion.div
          className="absolute -top-2 -right-2 bg-neon-purple text-foreground font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs z-50"
          key={bounceCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {bounceCount}
        </motion.div>
      )}

      <motion.div
        className="relative"
        animate={isClicked ? {
          y: [0, -40, 0, -20, 0, -10, 0],
          rotate: [0, 20, -20, 15, -15, 5, 0],
          scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
        } : {
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={isClicked ? {
          duration: 0.8,
          ease: 'easeOut',
        } : {
          duration: 5 + index,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
      >
        {/* Neon rim glow */}
        <motion.div 
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, hsl(160 92% 51% / 0.5), hsl(265 100% 64% / 0.3))`,
            transform: 'scale(1.2)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1.2, 1.4, 1.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <img
          src={src}
          alt={name}
          className="relative w-16 h-16 md:w-20 md:h-20 object-contain rounded-full"
          style={{
            filter: 'drop-shadow(0 0 10px hsl(160 92% 51% / 0.5)) drop-shadow(0 0 20px hsl(265 100% 64% / 0.3))',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const FloatingMemes = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {memes.map((meme, index) => (
        <FloatingMeme
          key={meme.name}
          src={meme.src}
          name={meme.name}
          emoji={meme.emoji}
          index={index}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
        />
      ))}
    </>
  );
};

export default FloatingMemes;

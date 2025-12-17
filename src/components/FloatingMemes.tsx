import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import popcatLogo from '@/assets/popcat-logo.png';
import bonkLogo from '@/assets/bonk-logo.png';
import dogeLogo from '@/assets/doge-logo.webp';
import pepeLogo from '@/assets/pepe-logo.png';
import shibaLogo from '@/assets/shiba-logo.png';

const memes = [
  { src: shibaLogo, name: 'Shiba', delay: 0 },
  { src: pepeLogo, name: 'Pepe', delay: 0.5 },
  { src: dogeLogo, name: 'Doge', delay: 1 },
  { src: bonkLogo, name: 'Bonk', delay: 1.5 },
  { src: popcatLogo, name: 'Popcat', delay: 2 },
];

const FloatingMeme = ({ 
  src, 
  name, 
  index, 
  mouseX, 
  mouseY 
}: { 
  src: string; 
  name: string; 
  index: number;
  mouseX: number;
  mouseY: number;
}) => {
  const positions = [
    { x: '5%', y: '20%' },
    { x: '85%', y: '15%' },
    { x: '90%', y: '60%' },
    { x: '8%', y: '70%' },
    { x: '75%', y: '85%' },
  ];

  const pos = positions[index % positions.length];
  
  // Parallax effect based on mouse
  const offsetX = (mouseX - 0.5) * 20 * (index % 2 === 0 ? 1 : -1);
  const offsetY = (mouseY - 0.5) * 20 * (index % 2 === 0 ? -1 : 1);

  return (
    <motion.div
      className="fixed z-20 pointer-events-none"
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
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5 + index,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
      >
        {/* Neon rim glow */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-50"
          style={{
            background: `radial-gradient(circle, hsl(160 92% 51% / 0.5), hsl(265 100% 64% / 0.3))`,
            transform: 'scale(1.2)',
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
          index={index}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
        />
      ))}
    </>
  );
};

export default FloatingMemes;

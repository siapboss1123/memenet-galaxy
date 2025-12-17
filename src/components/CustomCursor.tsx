import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let trailId = 0;
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail particle
      trailId++;
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: trailId }]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Clean old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-6));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {trail.map((particle, index) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: particle.x - 4,
              top: particle.y - 4,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: `linear-gradient(135deg, hsl(160 92% 51% / ${0.3 + index * 0.1}), hsl(265 100% 64% / ${0.2 + index * 0.05}))`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          rotate: isClicking ? [0, -10, 10, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div 
          className="relative text-2xl"
          style={{
            filter: `drop-shadow(0 0 10px hsl(160 92% 51%)) drop-shadow(0 0 20px hsl(265 100% 64% / 0.5))`,
          }}
        >
          🚀
          {/* Flame effect */}
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2"
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
          >
            <span className="text-sm" style={{ filter: 'blur(1px)' }}>🔥</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Glow ring on hover */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            width: 60,
            height: 60,
            border: '2px solid hsl(160 92% 51% / 0.5)',
            boxShadow: '0 0 20px hsl(160 92% 51% / 0.3), inset 0 0 20px hsl(265 100% 64% / 0.2)',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;

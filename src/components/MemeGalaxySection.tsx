import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import popcatLogo from '@/assets/popcat-logo.png';
import bonkLogo from '@/assets/bonk-logo.png';
import dogeLogo from '@/assets/doge-logo.webp';
import pepeLogo from '@/assets/pepe-logo.png';
import shibaLogo from '@/assets/shiba-logo.png';
import memenetLogo from '@/assets/memenet-logo.jpeg';

const orbitingMemes = [
  { src: shibaLogo, name: 'Shiba', orbit: 120, speed: 25, size: 50 },
  { src: pepeLogo, name: 'Pepe', orbit: 180, speed: 35, size: 55 },
  { src: dogeLogo, name: 'Doge', orbit: 240, speed: 45, size: 60 },
  { src: bonkLogo, name: 'Bonk', orbit: 160, speed: 30, size: 48 },
  { src: popcatLogo, name: 'Popcat', orbit: 200, speed: 40, size: 52 },
];

const MemeGalaxySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const parallaxX = useTransform(smoothX, [0, 1], [-30, 30]);
  const parallaxY = useTransform(smoothY, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Meme Galaxy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the interconnected universe of meme culture
          </p>
        </motion.div>

        {/* Galaxy visualization */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          {/* Background glow */}
          <motion.div
            className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(160 92% 51% / 0.15) 0%, hsl(265 100% 64% / 0.1) 40%, transparent 70%)',
              x: parallaxX,
              y: parallaxY,
            }}
          />

          {/* Central core */}
          <motion.div
            className="relative z-10"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(160 92% 51% / 0.5), hsl(265 100% 64% / 0.5))',
                transform: 'scale(1.5)',
              }}
              animate={{
                scale: [1.5, 1.8, 1.5],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.img
              src={memenetLogo}
              alt="MEMENET Core"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              style={{
                border: '3px solid hsl(160 92% 51% / 0.5)',
                boxShadow: '0 0 40px hsl(160 92% 51% / 0.4), 0 0 80px hsl(265 100% 64% / 0.3)',
              }}
              animate={{
                boxShadow: [
                  '0 0 40px hsl(160 92% 51% / 0.4), 0 0 80px hsl(265 100% 64% / 0.3)',
                  '0 0 60px hsl(160 92% 51% / 0.6), 0 0 120px hsl(265 100% 64% / 0.5)',
                  '0 0 40px hsl(160 92% 51% / 0.4), 0 0 80px hsl(265 100% 64% / 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Orbiting memes */}
          {orbitingMemes.map((meme, index) => {
            const startAngle = (index * 360) / orbitingMemes.length;
            return (
              <motion.div
                key={meme.name}
                className="absolute"
                style={{
                  width: meme.orbit * 2,
                  height: meme.orbit * 2,
                }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                {/* Orbit ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '1px solid hsl(160 92% 51% / 0.1)',
                    x: parallaxX,
                    y: parallaxY,
                  }}
                />
                
                {/* Orbiting meme */}
                <motion.div
                  className="absolute"
                  style={{
                    width: meme.size,
                    height: meme.size,
                    left: '50%',
                    top: '50%',
                    marginLeft: -meme.size / 2,
                    marginTop: -meme.size / 2,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: meme.speed,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    style={{
                      transform: `translateX(${meme.orbit}px)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: meme.speed,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <img
                        src={meme.src}
                        alt={meme.name}
                        className="w-full h-full object-contain rounded-full"
                        style={{
                          filter: 'drop-shadow(0 0 10px hsl(160 92% 51% / 0.5))',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(160 92% 51%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(265 100% 64%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(190 100% 51%)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + Math.cos((i * Math.PI) / 4) * 40}%`}
                y2={`${50 + Math.sin((i * Math.PI) / 4) * 40}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default MemeGalaxySection;

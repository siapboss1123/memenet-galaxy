import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Rocket, Zap, Brain, Globe, Sparkles } from 'lucide-react';

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Genesis',
    icon: Rocket,
    items: ['Brand & website launch', 'Community building', 'Fair launch on Solana (Pump.fun)'],
    color: 'neon-green',
  },
  {
    phase: 'Phase 2',
    title: 'Meme Network',
    icon: Zap,
    items: ['Meme campaigns', 'Solana community partnerships', 'Enhanced website interactivity'],
    color: 'neon-cyan',
  },
  {
    phase: 'Phase 3',
    title: 'AI Integration',
    icon: Brain,
    items: ['AI-powered meme tools', 'Meme intelligence system', 'Dashboard preview'],
    color: 'neon-purple',
  },
  {
    phase: 'Phase 4',
    title: 'Expansion',
    icon: Globe,
    items: ['Creator utilities', 'Ecosystem growth', 'Advanced AI features'],
    color: 'electric-blue',
  },
  {
    phase: 'Phase 5',
    title: 'Memetaverse',
    icon: Sparkles,
    items: ['Fully interactive Meme Galaxy', 'Gamified meme ecosystem', 'Long-term evolution'],
    color: 'neon-green',
  },
];

const RoadmapNode = ({ 
  phase, 
  index, 
  isLast 
}: { 
  phase: typeof roadmapPhases[0]; 
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = phase.icon;

  const colorMap: Record<string, { border: string; glow: string; bg: string }> = {
    'neon-green': {
      border: 'border-neon-green',
      glow: '0 0 30px hsl(160 92% 51% / 0.5)',
      bg: 'bg-neon-green/20',
    },
    'neon-cyan': {
      border: 'border-neon-cyan',
      glow: '0 0 30px hsl(157 100% 50% / 0.5)',
      bg: 'bg-neon-cyan/20',
    },
    'neon-purple': {
      border: 'border-secondary',
      glow: '0 0 30px hsl(265 100% 64% / 0.5)',
      bg: 'bg-secondary/20',
    },
    'electric-blue': {
      border: 'border-accent',
      glow: '0 0 30px hsl(190 100% 51% / 0.5)',
      bg: 'bg-accent/20',
    },
  };

  const colors = colorMap[phase.color];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={`flex items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Content Card */}
        <motion.div
          className={`flex-1 glass-card p-6 md:p-8 relative cursor-pointer ${isLeft ? 'md:text-right' : 'md:text-left'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          animate={{
            boxShadow: isHovered ? colors.glow : 'none',
          }}
        >
          <span className={`font-display text-sm uppercase tracking-wider ${phase.color === 'neon-green' ? 'text-neon-green' : phase.color === 'neon-cyan' ? 'text-neon-cyan' : phase.color === 'neon-purple' ? 'text-secondary' : 'text-accent'}`}>
            {phase.phase}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            {phase.title}
          </h3>
          <ul className={`space-y-2 text-muted-foreground ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
            {phase.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2"
                style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}
              >
                {!isLeft && <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />}
                {item}
                {isLeft && <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Node */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className={`w-16 h-16 rounded-full ${colors.border} border-2 ${colors.bg} flex items-center justify-center z-10`}
            animate={{
              boxShadow: isHovered 
                ? [colors.glow, `${colors.glow}, 0 0 60px hsl(160 92% 51% / 0.3)`, colors.glow]
                : '0 0 15px hsl(160 92% 51% / 0.2)',
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: isHovered ? 0.5 : 0.3,
              repeat: isHovered ? Infinity : 0,
            }}
          >
            <Icon className={`w-7 h-7 ${phase.color === 'neon-green' ? 'text-neon-green' : phase.color === 'neon-cyan' ? 'text-neon-cyan' : phase.color === 'neon-purple' ? 'text-secondary' : 'text-accent'}`} />
          </motion.div>
          
          {/* Connecting line */}
          {!isLast && (
            <motion.div
              className="w-0.5 h-24 md:h-32 bg-gradient-to-b from-neon-green/50 to-neon-purple/50"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          )}
        </div>

        {/* Spacer for alignment */}
        <div className="flex-1 hidden md:block" />
      </div>
    </motion.div>
  );
};

const RoadmapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Roadmap
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our journey to revolutionize the meme economy
          </p>
        </motion.div>

        <div className="space-y-0">
          {roadmapPhases.map((phase, index) => (
            <RoadmapNode
              key={phase.phase}
              phase={phase}
              index={index}
              isLast={index === roadmapPhases.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;

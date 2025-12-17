import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Brain, Users, Coins } from 'lucide-react';

const ecosystemItems = [
  {
    icon: Sparkles,
    title: 'Meme Culture',
    description: 'Embracing the power of viral content and community creativity',
    color: 'neon-green',
  },
  {
    icon: Brain,
    title: 'AI Intelligence',
    description: 'Leveraging artificial intelligence to enhance meme creation',
    color: 'neon-purple',
  },
  {
    icon: Users,
    title: 'Community Network',
    description: 'Building a global network of meme enthusiasts and creators',
    color: 'neon-cyan',
  },
  {
    icon: Coins,
    title: 'Digital Value',
    description: 'Transforming creativity into real digital economic value',
    color: 'electric-blue',
  },
];

const EcosystemCard = ({ 
  item, 
  index 
}: { 
  item: typeof ecosystemItems[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = item.icon;

  const colorMap: Record<string, { border: string; glow: string; text: string }> = {
    'neon-green': {
      border: 'hsl(160 92% 51%)',
      glow: 'hsl(160 92% 51% / 0.3)',
      text: 'text-neon-green',
    },
    'neon-purple': {
      border: 'hsl(265 100% 64%)',
      glow: 'hsl(265 100% 64% / 0.3)',
      text: 'text-secondary',
    },
    'neon-cyan': {
      border: 'hsl(157 100% 50%)',
      glow: 'hsl(157 100% 50% / 0.3)',
      text: 'text-neon-cyan',
    },
    'electric-blue': {
      border: 'hsl(190 100% 51%)',
      glow: 'hsl(190 100% 51% / 0.3)',
      text: 'text-accent',
    },
  };

  const colors = colorMap[item.color];

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.div
        className="glass-card p-6 md:p-8 h-full relative overflow-hidden cursor-pointer"
        whileHover={{ 
          y: -10,
          transition: { duration: 0.3 }
        }}
        style={{
          borderColor: `${colors.border}33`,
        }}
      >
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${colors.glow}, transparent 70%)`,
          }}
        />

        {/* Animated data lines */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none"
          initial={false}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${20 + i * 20}%`,
                background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        {/* Icon */}
        <motion.div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative ${colors.text}`}
          style={{
            background: `linear-gradient(135deg, ${colors.border}20, ${colors.border}10)`,
            border: `1px solid ${colors.border}50`,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon size={28} />
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ boxShadow: `0 0 20px ${colors.glow}` }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Content */}
        <h3 className={`font-display text-xl md:text-2xl font-bold mb-3 ${colors.text}`}>
          {item.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const EcosystemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 gradient-text">
            The Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four pillars powering the future of meme-driven innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ecosystemItems.map((item, index) => (
            <EcosystemCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;

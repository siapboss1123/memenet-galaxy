import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-20 px-4 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neon-green/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Logo and tagline */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-4xl md:text-5xl font-black gradient-text mb-4">
            $MEMENET
          </h3>
          <p className="text-muted-foreground text-lg">
            Where Memes Meet AI
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { icon: Twitter, label: 'Twitter', href: '#' },
            { icon: MessageCircle, label: 'Telegram', href: '#' },
            { icon: Github, label: 'GitHub', href: '#' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-neon-green transition-colors"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 20px hsl(160 92% 51% / 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 $MEMENET. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neon-green transition-colors">Terms</a>
              <a href="#" className="hover:text-neon-green transition-colors">Privacy</a>
              <a href="#" className="hover:text-neon-green transition-colors">Docs</a>
            </div>
          </div>
        </motion.div>

        {/* Neon line decoration */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(160 92% 51% / 0.5), hsl(265 100% 64% / 0.5), transparent)',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </div>
    </footer>
  );
};

export default Footer;

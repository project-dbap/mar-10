import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center">
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gold font-display text-lg md:text-xl tracking-[0.3em] uppercase mb-6">
          
          Happy Birthday
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-cream animate-pulse-glow mb-8">
          
          Bhagirathi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="font-display text-xl md:text-2xl text-gold-light italic max-w-lg mx-auto">
          
          A gift from your very CS boyfriend :)       
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-2">
        
        <span className="text-muted-foreground text-sm font-body tracking-widest uppercase">
          Swipe or press → to explore
        </span>
        <ChevronDown className="w-5 h-5 text-gold animate-scroll-bounce rotate-[-90deg]" />
      </motion.div>
    </section>);

};

export default HeroSection;
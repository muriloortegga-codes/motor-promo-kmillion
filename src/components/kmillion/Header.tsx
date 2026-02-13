import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border"
    >
      <div className="km-container flex items-center justify-between h-16">
        <div className="font-display font-bold text-xl">
          <span className="text-gradient">K</span>million
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#problema" className="hover:text-foreground transition-colors">Problema</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#diferencial" className="hover:text-foreground transition-colors">Diferencial</a>
          <a href="#ecossistema" className="hover:text-foreground transition-colors">Ecossistema</a>
        </nav>
        <button className="gradient-primary text-primary-foreground font-medium px-5 py-2 rounded-lg text-sm">
          Fale conosco
        </button>
      </div>
    </motion.header>
  );
};

export default Header;

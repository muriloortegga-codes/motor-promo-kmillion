import React from 'react';
import LogoKmillion from './LogoKmillion';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="km-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-32 sm:w-40 text-km-primary flex items-center">
          <LogoKmillion className="w-full h-auto" />
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Kmillion. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

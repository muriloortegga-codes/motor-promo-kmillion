import { motion } from "framer-motion";
import { Settings, Send, Zap, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  { icon: Settings, label: "Definir regras" },
  { icon: Send, label: "Publicar" },
  { icon: Zap, label: "Valer em tempo real" },
  { icon: BarChart3, label: "Acompanhar resultados" },
];

const WhatIsSection = () => {
  return (
    <section className="km-section gradient-section-alt">
      <div className="km-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Um motor que se adapta à sua{" "}
            <span className="text-gradient">estratégia.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4">Não o contrário.</p>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            O Motor Promocional Kmillion é uma plataforma de gestão de promoções
            que permite ao time de marketing criar, configurar e ativar campanhas
            complexas sem depender de TI — com atualização em tempo real e
            cobertura omnichannel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 lg:gap-6"
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="km-card-highlight flex items-center gap-3 px-6 py-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-foreground whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-primary hidden lg:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsSection;

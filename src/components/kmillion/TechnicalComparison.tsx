import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  { feature: "Promoções concorrentes", market: "Limitado", km: "Ilimitado" },
  { feature: "Atualização", market: "Por carga (batch)", km: "Tempo real" },
  { feature: "Complexidade de regras", market: "Simples", km: "Avançada" },
  { feature: "Dependência de TI", market: "Alta", km: "Zero" },
  { feature: "Benefícios combinados", market: "Isolados", km: "Integrados" },
];

const TechnicalComparison = () => {
  return (
    <section className="km-section gradient-section-alt">
      <div className="km-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
        >
          Diferencial <span className="text-gradient">técnico</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto km-card-highlight overflow-hidden p-0"
        >
          <div className="grid grid-cols-3 text-center font-display font-semibold text-sm border-b border-border">
            <div className="p-4 text-muted-foreground">Recurso</div>
            <div className="p-4 text-muted-foreground bg-muted/50">Mercado</div>
            <div className="p-4 gradient-primary text-primary-foreground rounded-tr-2xl">Kmillion</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 text-center text-sm ${i < rows.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="p-4 font-medium text-foreground text-left pl-6">{row.feature}</div>
              <div className="p-4 text-muted-foreground bg-muted/30 flex items-center justify-center gap-1">
                <X className="w-4 h-4 text-km-red" />
                {row.market}
              </div>
              <div className="p-4 text-foreground font-medium flex items-center justify-center gap-1 bg-accent/50">
                <Check className="w-4 h-4 text-km-green" />
                {row.km}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalComparison;

import { motion } from "framer-motion";
import { Coins, Users, MessageCircle, Store, ShoppingCart, BarChart3 } from "lucide-react";

const nodes = [
  { icon: Coins, label: "Cashback", angle: 0 },
  { icon: Users, label: "Influenciadores", angle: 60 },
  { icon: MessageCircle, label: "WhatsApp/SMS", angle: 120 },
  { icon: Store, label: "PDV", angle: 180 },
  { icon: ShoppingCart, label: "E-commerce", angle: 240 },
  { icon: BarChart3, label: "Dashboard", angle: 300 },
];

const EcosystemSection = () => {
  const radius = 160;

  return (
    <section className="km-section gradient-section-alt">
      <div className="km-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            O motor é o núcleo do{" "}
            <span className="text-gradient">ecossistema Kmillion.</span>
          </h2>
        </motion.div>

        {/* Mobile: grid layout */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="km-card text-center"
            >
              <node.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-foreground">{node.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Desktop: circular diagram */}
        <div className="hidden lg:flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{ width: radius * 2 + 140, height: radius * 2 + 140 }}
          >
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 z-10">
              <span className="text-primary-foreground font-display font-bold text-sm text-center leading-tight">Motor<br/>Promocional</span>
            </div>

            {/* Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border-2 border-dashed border-primary/20" />

            {/* Nodes */}
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={node.label}
                  className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div className="w-14 h-14 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center">
                    <node.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">{node.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;

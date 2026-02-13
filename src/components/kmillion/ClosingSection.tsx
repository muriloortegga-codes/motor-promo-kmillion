import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ClosingSection = () => {
  return (
    <section className="km-section gradient-section-alt">
      <div className="km-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Promoção não é sobre desconto.{" "}
            <br className="hidden md:block" />
            É sobre <span className="text-gradient">controle.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Controle de regra, margem, canal e comportamento em tempo real.
            O Motor Promocional Kmillion é a base para operações que exigem
            inteligência, agilidade e performance.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 gradient-primary text-primary-foreground font-semibold px-10 py-4 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
          >
            Converse com nosso time
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;

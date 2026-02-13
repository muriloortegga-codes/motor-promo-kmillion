import { motion } from "framer-motion";
import { Megaphone, Wifi, Users, TrendingUp, CalendarDays } from "lucide-react";

const cases = [
  { number: "35", label: "campanhas simultâneas", icon: Megaphone },
  { number: "+200", label: "PDVs conectados", icon: Wifi },
  { number: "∞", label: "regras por funcionário com controle de saldo", icon: Users },
  { number: "N", label: "ciclos de compra progressivos", icon: TrendingUp },
  { number: "7/7", label: "promoções por dia específico", icon: CalendarDays },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const PracticalCases = () => {
  return (
    <section className="km-section bg-background">
      <div className="km-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Na prática, isso <span className="text-gradient">significa:</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {cases.map((c) => (
            <motion.div key={c.label} variants={item} className="km-card-highlight text-center">
              <c.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="font-display text-4xl font-bold text-gradient mb-2">{c.number}</div>
              <p className="text-sm text-muted-foreground leading-snug">{c.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PracticalCases;

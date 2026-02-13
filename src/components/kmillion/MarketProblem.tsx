import { motion } from "framer-motion";
import { Monitor, WifiOff, Lock, Shuffle, Unplug } from "lucide-react";

const problems = [
  { icon: Monitor, title: "Dependência de TI", desc: "Toda alteração passa por chamados e filas de desenvolvimento." },
  { icon: WifiOff, title: "Atualização offline", desc: "Promoções que levam horas ou dias para chegar ao ponto de venda." },
  { icon: Lock, title: "Limite de regras", desc: "Sistemas que suportam poucas condições simultâneas." },
  { icon: Shuffle, title: "Falta de flexibilidade", desc: "Impossibilidade de combinar benefícios e condições complexas." },
  { icon: Unplug, title: "Omnichannel desconectado", desc: "Canais que não conversam entre si, gerando inconsistência." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MarketProblem = () => {
  return (
    <section className="km-section bg-background">
      <div className="km-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            A maioria dos motores promocionais{" "}
            <span className="text-gradient">limita sua estratégia.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {problems.map((p) => (
            <motion.div key={p.title} variants={item} className="km-card text-center">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                <p.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarketProblem;

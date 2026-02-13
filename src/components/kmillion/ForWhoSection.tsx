import { motion } from "framer-motion";
import { Store, GitBranch, Globe, Building2, Heart, Handshake } from "lucide-react";

const segments = [
  { icon: Store, title: "Redes de varejo", desc: "Gestão centralizada de campanhas em todas as unidades." },
  { icon: GitBranch, title: "Franquias", desc: "Controle de regras por franqueado com governança central." },
  { icon: Globe, title: "Operações omnichannel", desc: "Mesma promoção no PDV, e-commerce e app." },
  { icon: Building2, title: "Múltiplas lojas", desc: "Promoções regionalizadas com escala nacional." },
  { icon: Heart, title: "Programas de fidelização", desc: "Regras progressivas e ciclos de compra." },
  { icon: Handshake, title: "Operações com revendedores", desc: "Incentivos segmentados por canal de venda." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ForWhoSection = () => {
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
            Feito para redes que{" "}
            <span className="text-gradient">não aceitam limitações.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {segments.map((s) => (
            <motion.div key={s.title} variants={item} className="km-card group">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:gradient-primary transition-all">
                <s.icon className="w-6 h-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ForWhoSection;

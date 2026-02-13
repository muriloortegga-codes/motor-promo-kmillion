import { motion } from "framer-motion";
import {
  ShoppingBag, Layers, Store, MapPin, User, CreditCard,
  Wallet, CalendarDays, RefreshCw,
  Percent, TrendingUp, Package, Gift, Coins, Ticket, ArrowUpRight,
  Zap
} from "lucide-react";

const conditions = [
  { icon: ShoppingBag, label: "Produto" },
  { icon: Layers, label: "Categoria" },
  { icon: Store, label: "Loja" },
  { icon: MapPin, label: "Região" },
  { icon: User, label: "Cliente específico" },
  { icon: CreditCard, label: "Forma de pagamento" },
  { icon: Wallet, label: "Cartão" },
  { icon: CalendarDays, label: "Data" },
  { icon: RefreshCw, label: "Ciclo de compra" },
];

const benefits = [
  { icon: Percent, label: "Desconto" },
  { icon: TrendingUp, label: "Progressivo" },
  { icon: Package, label: "Combo" },
  { icon: Gift, label: "Brinde" },
  { icon: Coins, label: "Cashback" },
  { icon: Ticket, label: "Cupom" },
  { icon: ArrowUpRight, label: "Upselling automático" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const HowItWorks = () => {
  return (
    <section className="km-section bg-background">
      <div className="km-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
        >
          Como <span className="text-gradient">funciona</span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Column 1 */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="km-card-highlight"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">1</span>
              <h3 className="font-display text-xl font-bold text-foreground">Defina as condições</h3>
            </div>
            <div className="space-y-3">
              {conditions.map((c) => (
                <motion.div key={c.label} variants={item} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                  <c.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{c.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="km-card-highlight"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">2</span>
              <h3 className="font-display text-xl font-bold text-foreground">Escolha o benefício</h3>
            </div>
            <div className="space-y-3">
              {benefits.map((b) => (
                <motion.div key={b.label} variants={item} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                  <b.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="km-card-highlight flex flex-col items-center justify-center text-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">3</span>
              <h3 className="font-display text-xl font-bold text-foreground">Publique</h3>
            </div>
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Valendo instantaneamente em todos os PDVs e canais integrados.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

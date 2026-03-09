import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Store, ShoppingBag, Package, Star, Users,
  MapPin, Smartphone, Globe, Layers,
  DollarSign, ShoppingCart, Tag, BarChart2, Calendar, CreditCard,
  Percent, ArrowUpRight, Wallet, Gift, Truck, Ticket,
  CheckCircle2, ChevronRight, ChevronLeft, Zap, Mail,
  Building2, Loader2, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Option {
  id: string;
  label: string;
  icon: React.ElementType;
  description?: string;
}

// ─── Step data ────────────────────────────────────────────────────────────────
const STEP1_OPTIONS: Option[] = [
  { id: "ticket", label: "Aumentar ticket médio", icon: TrendingUp },
  { id: "fluxo", label: "Aumentar fluxo na loja", icon: Store },
  { id: "estoque", label: "Queimar estoque", icon: Package },
  { id: "lancamento", label: "Lançar produto", icon: Sparkles },
  { id: "fidelizar", label: "Fidelizar clientes", icon: Star },
  { id: "novos", label: "Atrair novos clientes", icon: Users },
];

const STEP2_OPTIONS: Option[] = [
  { id: "fisica", label: "Loja física", icon: Store },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingBag },
  { id: "app", label: "App", icon: Smartphone },
  { id: "omnichannel", label: "Omnichannel", icon: Globe, description: "Todos os canais simultaneamente" },
];

const STEP3_OPTIONS: Option[] = [
  { id: "valor", label: "Comprar acima de um valor", icon: DollarSign },
  { id: "qtd", label: "Comprar X produtos", icon: ShoppingCart },
  { id: "produto", label: "Comprar produto específico", icon: Tag },
  { id: "combo", label: "Comprar combinação de produtos", icon: Layers },
  { id: "vip", label: "Ser cliente VIP", icon: Star },
  { id: "dia", label: "Comprar em dia específico", icon: Calendar },
  { id: "cartao", label: "Usar cartão específico", icon: CreditCard },
];

const STEP4_OPTIONS: Option[] = [
  { id: "desconto", label: "Desconto percentual", icon: Percent },
  { id: "progressivo", label: "Desconto progressivo", icon: ArrowUpRight },
  { id: "cashback", label: "Cashback", icon: Wallet },
  { id: "brinde", label: "Brinde", icon: Gift },
  { id: "frete", label: "Frete grátis", icon: Truck },
  { id: "cupom", label: "Cupom para próxima compra", icon: Ticket },
];

const BENEFIT_PREVIEWS: Record<string, { title: string; description: string }> = {
  cashback: {
    title: "Como funciona o Cashback",
    description: "O cliente recebe de volta uma % do valor pago como crédito para a próxima compra, incentivando a recompra.",
  },
  progressivo: {
    title: "Como funciona o Desconto Progressivo",
    description: "Quanto mais o cliente compra, maior o desconto: 5% em 3 itens, 10% em 5 itens, 15% em 8 itens.",
  },
};

const STEP6_AUTOMATIONS = [
  { label: "Valida regras em tempo real", icon: CheckCircle2 },
  { label: "Escolhe a melhor promoção", icon: Zap },
  { label: "Sugere upsell automático", icon: TrendingUp },
  { label: "Aplica promoções acumulativas", icon: Layers },
  { label: "Entrega o benefício instantaneamente", icon: Globe },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const STEP_LABELS = ["Objetivo", "Canal", "Condição", "Benefício", "Impacto", "Automação", "Resultado"];

// ─── Sub-components ───────────────────────────────────────────────────────────
const ProgressBar = ({ step, total }: { step: number; total: number }) => (
  <div className="w-full mb-8">
    <div className="flex justify-between mb-3">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < step
                ? "gradient-primary text-primary-foreground"
                : i === step
                ? "border-2 border-primary text-primary bg-accent"
                : "border-2 border-border text-muted-foreground bg-background"
            }`}
          >
            {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
          </div>
          <span className={`text-[10px] hidden sm:block font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
    <div className="relative h-1.5 bg-border rounded-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 h-full gradient-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(step / (total - 1)) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  </div>
);

const OptionCard = ({
  option,
  selected,
  onClick,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
      selected
        ? "border-primary bg-accent shadow-md"
        : "border-border bg-card hover:border-primary/40 hover:bg-accent/40"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
          selected ? "gradient-primary" : "bg-secondary"
        }`}
      >
        <option.icon className={`w-4 h-4 ${selected ? "text-primary-foreground" : "text-muted-foreground"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>
          {option.label}
        </span>
        {option.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
        )}
      </div>
      {selected && (
        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
      )}
    </div>
  </motion.button>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const HowItWorks = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [sliders, setSliders] = useState({ ticket: 200, clientes: 500, desconto: 10 });
  const [form, setForm] = useState({ name: "", email: "", empresa: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSteps = 7; // 6 steps + result

  const select = (stepIndex: number, id: string) => {
    setSelections((prev) => ({ ...prev, [stepIndex]: id }));
  };

  const canAdvance = () => {
    if (step === 4) return true; // sliders always have value
    if (step === 5) return true; // automação screen, just view
    if (step === 6) return submitted;
    return !!selections[step];
  };

  const next = () => { if (step < totalSteps - 1 && canAdvance()) setStep((s) => s + 1); };
  const prev = () => { if (step > 0) setStep((s) => s - 1); };

  // Impact calc
  const receita = sliders.ticket * sliders.clientes;
  const impacto = Math.round(receita * (sliders.desconto / 100));
  const ticketProjetado = Math.round(sliders.ticket * (1 + (100 - sliders.desconto) / 500));


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <section className="km-section bg-background">
      <div className="km-container">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-accent px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-3 h-3" /> Simulador Interativo
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Como <span className="text-gradient">funciona</span> na prática
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Monte uma campanha real em 6 passos e veja como o Motor Promocional Kmillion a executa em tempo real.
          </p>
        </motion.div>

        {/* Simulator card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            {/* Header strip */}
            <div className="gradient-primary px-6 py-4 flex items-center justify-between">
              <span className="text-primary-foreground font-display font-bold text-sm">
                Simulador de Campanha Kmillion
              </span>
              <span className="text-primary-foreground/70 text-xs">
                Passo {Math.min(step + 1, 6)} de 6
              </span>
            </div>

            <div className="p-6 md:p-8">
              <ProgressBar step={step} total={totalSteps} />

              <AnimatePresence mode="wait">
                {/* ── STEP 0: Objetivo ── */}
                {step === 0 && (
                  <motion.div key="step0" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Qual o objetivo da sua campanha?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Escolha um objetivo principal.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {STEP1_OPTIONS.map((o) => (
                        <OptionCard key={o.id} option={o} selected={selections[0] === o.id} onClick={() => select(0, o.id)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 1: Canal ── */}
                {step === 1 && (
                  <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Onde sua promoção será aplicada?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Selecione o canal de atuação.</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-5">
                      {STEP2_OPTIONS.map((o) => (
                        <OptionCard key={o.id} option={o} selected={selections[1] === o.id} onClick={() => select(1, o.id)} />
                      ))}
                    </div>
                    <div className="rounded-xl bg-accent border border-primary/20 p-4 text-sm text-accent-foreground flex gap-3 items-start">
                      <Globe className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>O Motor Promocional Kmillion conecta todos os canais e aplica a mesma regra em tempo real.</span>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Condição ── */}
                {step === 2 && (
                  <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Qual condição ativa o benefício?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Selecione a regra de ativação.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {STEP3_OPTIONS.map((o) => (
                        <OptionCard key={o.id} option={o} selected={selections[2] === o.id} onClick={() => select(2, o.id)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Benefício ── */}
                {step === 3 && (
                  <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Qual benefício o cliente recebe?</h3>
                    <p className="text-sm text-muted-foreground mb-5">Selecione o tipo de benefício.</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      {STEP4_OPTIONS.map((o) => (
                        <OptionCard key={o.id} option={o} selected={selections[3] === o.id} onClick={() => select(3, o.id)} />
                      ))}
                    </div>
                    {selections[3] && BENEFIT_PREVIEWS[selections[3]] && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-accent border border-primary/20 p-4"
                      >
                        <p className="text-sm font-semibold text-primary mb-1">
                          {BENEFIT_PREVIEWS[selections[3]].title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {BENEFIT_PREVIEWS[selections[3]].description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 4: Impacto ── */}
                {step === 4 && (
                  <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Simule o impacto da campanha</h3>
                    <p className="text-sm text-muted-foreground mb-6">Ajuste os parâmetros e veja a projeção em tempo real.</p>

                    <div className="space-y-6 mb-6">
                      {/* Ticket médio */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-semibold text-foreground">Valor médio da compra</label>
                          <span className="text-sm font-bold text-primary">{formatCurrency(sliders.ticket)}</span>
                        </div>
                        <Slider
                          min={50} max={2000} step={50}
                          value={[sliders.ticket]}
                          onValueChange={([v]) => setSliders((s) => ({ ...s, ticket: v }))}
                        />
                      </div>

                      {/* Clientes */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-semibold text-foreground">Clientes impactados</label>
                          <span className="text-sm font-bold text-primary">{sliders.clientes.toLocaleString("pt-BR")}</span>
                        </div>
                        <Slider
                          min={50} max={10000} step={50}
                          value={[sliders.clientes]}
                          onValueChange={([v]) => setSliders((s) => ({ ...s, clientes: v }))}
                        />
                      </div>

                      {/* Desconto */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-semibold text-foreground">Percentual de desconto / cashback</label>
                          <span className="text-sm font-bold text-primary">{sliders.desconto}%</span>
                        </div>
                        <Slider
                          min={1} max={50} step={1}
                          value={[sliders.desconto]}
                          onValueChange={([v]) => setSliders((s) => ({ ...s, desconto: v }))}
                        />
                      </div>
                    </div>

                    {/* Impact cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Receita estimada", value: formatCurrency(receita), icon: BarChart2, positive: true },
                        { label: "Impacto promocional", value: formatCurrency(impacto), icon: Percent, positive: false },
                        { label: "Ticket médio projetado", value: formatCurrency(ticketProjetado), icon: TrendingUp, positive: true },
                      ].map((card) => (
                        <motion.div
                          key={card.label}
                          layout
                          className="bg-secondary rounded-xl p-3 text-center border border-border"
                        >
                          <card.icon className={`w-4 h-4 mx-auto mb-1 ${card.positive ? "text-primary" : "text-destructive"}`} />
                          <p className="text-xs text-muted-foreground mb-1 leading-tight">{card.label}</p>
                          <p className={`text-sm font-bold ${card.positive ? "text-foreground" : "text-destructive"}`}>{card.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 5: Automação ── */}
                {step === 5 && (
                  <motion.div key="step5" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">O Motor aplica automaticamente:</h3>
                    <p className="text-sm text-muted-foreground mb-6">Enquanto o marketing cria, o motor executa sem depender de TI.</p>

                    <div className="space-y-3 mb-6">
                      {STEP6_AUTOMATIONS.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.12, duration: 0.3 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border"
                        >
                          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.12 + 0.3 }}
                            className="ml-auto"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="rounded-xl gradient-primary p-4 text-center">
                      <Zap className="w-6 h-6 text-primary-foreground mx-auto mb-2" />
                      <p className="text-primary-foreground font-semibold text-sm">
                        Campanha ativa em todos os PDVs e canais em tempo real
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 6: Resultado + Lead ── */}
                {step === 6 && (
                  <motion.div key="step6" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      Seu planejamento promocional está pronto
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">Resumo da campanha simulada.</p>

                    {/* Campaign summary */}
                    <div className="bg-secondary rounded-xl border border-border p-4 mb-5 grid sm:grid-cols-2 gap-3">
                      {[
                        { label: "Objetivo", value: STEP1_OPTIONS.find((o) => o.id === selections[0])?.label ?? "—" },
                        { label: "Canal", value: STEP2_OPTIONS.find((o) => o.id === selections[1])?.label ?? "—" },
                        { label: "Condição", value: STEP3_OPTIONS.find((o) => o.id === selections[2])?.label ?? "—" },
                        { label: "Benefício", value: STEP4_OPTIONS.find((o) => o.id === selections[3])?.label ?? "—" },
                        { label: "Receita estimada", value: formatCurrency(receita) },
                        { label: "Impacto promocional", value: formatCurrency(impacto) },
                      ].map((row) => (
                        <div key={row.label} className="flex flex-col gap-0.5">
                          <span className="text-xs text-muted-foreground">{row.label}</span>
                          <span className="text-sm font-semibold text-foreground">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {!submitted ? (
                      <>
                        <div className="rounded-xl border-2 border-dashed border-primary/30 bg-accent/50 p-5 mb-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-4 h-4 text-primary" />
                            <p className="text-sm font-semibold text-foreground">Receba este planejamento completo no seu e-mail</p>
                          </div>
                          <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                              type="text"
                              placeholder="Seu nome"
                              value={form.name}
                              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                              required
                              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <input
                              type="email"
                              placeholder="Seu e-mail profissional"
                              value={form.email}
                              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                              required
                              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="text"
                                placeholder="Empresa"
                                value={form.empresa}
                                onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
                                className="w-full h-10 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            <Button
                              type="submit"
                              disabled={loading || !form.name || !form.email}
                              className="w-full gradient-primary text-primary-foreground font-semibold h-11 rounded-lg"
                            >
                              {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              ) : (
                                <Mail className="w-4 h-4 mr-2" />
                              )}
                              {loading ? "Enviando..." : "Receber planejamento da campanha"}
                            </Button>
                          </form>
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl gradient-primary p-6 text-center"
                      >
                        <CheckCircle2 className="w-10 h-10 text-primary-foreground mx-auto mb-3" />
                        <p className="text-primary-foreground font-display font-bold text-lg mb-1">
                          Planejamento enviado!
                        </p>
                        <p className="text-primary-foreground/80 text-sm">
                          Verifique sua caixa de entrada. Em breve nossa equipe entrará em contato.
                        </p>
                      </motion.div>
                    )}

                    <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                      Com o Motor Promocional Kmillion você pode criar campanhas como essa em minutos e ativá-las em toda sua rede em tempo real.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>

                {step < 6 && (
                  <Button
                    onClick={next}
                    disabled={!canAdvance()}
                    className="gradient-primary text-primary-foreground font-semibold px-6 h-10 rounded-lg flex items-center gap-2 disabled:opacity-40"
                  >
                    {step === 5 ? "Ver resultado" : "Próximo passo"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
                {step === 6 && submitted && (
                  <Button
                    onClick={() => { setStep(0); setSelections({}); setSubmitted(false); setForm({ name: "", email: "", empresa: "" }); }}
                    variant="outline"
                    className="border-primary text-primary hover:bg-accent"
                  >
                    Simular novamente
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

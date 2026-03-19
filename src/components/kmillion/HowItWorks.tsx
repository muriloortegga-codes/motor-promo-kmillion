import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Zap, CheckCircle2, Layers, Globe,
  DollarSign, RefreshCw, BarChart3, ArrowRight,
  Wallet, Percent, ShoppingBag, Tag,
  Users, TrendingDown, Calendar, AlertCircle
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const fmtNum = (v: number) => v.toLocaleString("pt-BR");

const pct = (v: number) => `${v.toFixed(1)}%`;

// ─── Campaign type pills ─────────────────────────────────────────────────────
const CAMPAIGN_TYPES = [
  { id: "cashback",     label: "Cashback",              icon: Wallet },
  { id: "progressivo",  label: "Desconto progressivo",  icon: TrendingUp },
  { id: "combo",        label: "Combo",                 icon: ShoppingBag },
  { id: "cupom",        label: "Cupom",                 icon: Tag },
];

// ─── Automation items ────────────────────────────────────────────────────────
const AUTOMATIONS = [
  { label: "Valida regras em tempo real",        icon: CheckCircle2 },
  { label: "Escolhe a melhor promoção",          icon: Zap },
  { label: "Sugere upsell automático",           icon: TrendingUp },
  { label: "Aplica promoções acumulativas",      icon: Layers },
  { label: "Entrega o benefício instantâneo",    icon: Globe },
];

// ─── Result card ─────────────────────────────────────────────────────────────
interface ResultCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  delay?: number;
}

const ResultCard = ({ icon: Icon, label, value, sub, highlight, delay = 0 }: ResultCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`rounded-2xl p-5 flex flex-col gap-1 border ${
      highlight
        ? "gradient-primary border-transparent text-primary-foreground"
        : "bg-card border-border"
    }`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 ${
      highlight ? "bg-white/20" : "bg-accent"
    }`}>
      <Icon className={`w-4 h-4 ${highlight ? "text-primary-foreground" : "text-primary"}`} />
    </div>
    <p className={`text-xs font-medium ${highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
      {label}
    </p>
    <p className={`text-2xl font-display font-bold leading-tight ${
      highlight ? "text-primary-foreground" : "text-foreground"
    }`}>
      {value}
    </p>
    {sub && (
      <p className={`text-xs ${highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        {sub}
      </p>
    )}
  </motion.div>
);

// ─── Slider row ──────────────────────────────────────────────────────────────
interface SliderRowProps {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}

const SliderRow = ({ label, value, display, min, max, step, onChange, hint }: SliderRowProps) => (
  <div>
    <div className="flex justify-between items-baseline mb-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <span className="text-base font-bold text-primary tabular-nums">{display}</span>
    </div>
    <Slider
      min={min} max={max} step={step}
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      className="mb-1"
    />
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);

// ─── Main ────────────────────────────────────────────────────────────────────
const HowItWorks = () => {
  // — Bloco 1: contexto
  const [clientesAtivos, setClientesAtivos]   = useState(2000);
  const [ticketAtual, setTicketAtual]         = useState(250);
  const [comprasMes, setComprasMes]           = useState(1.2);

  // — Bloco 2: mecânica
  const [campanha, setCampanha]               = useState("cashback");
  const [beneficioPct, setBeneficioPct]       = useState(10);
  const [taxaRetorno, setTaxaRetorno]         = useState(20);

  // — Bloco 3: comportamento
  const [aumentoTicket, setAumentoTicket]     = useState(15);
  const [pctRetornam, setPctRetornam]         = useState(30);
  const [freqApos, setFreqApos]               = useState(1.5);

  // — Calculations ─────────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const ticketProjetado       = ticketAtual * (1 + aumentoTicket / 100);
    const clientesRetornam      = Math.round(clientesAtivos * (pctRetornam / 100));
    const receitaBase           = clientesAtivos * ticketAtual * comprasMes;
    const receitaAdicional      = clientesRetornam * ticketProjetado * (freqApos - comprasMes);
    const receitaImpactada      = clientesRetornam * ticketProjetado * freqApos;
    const investimento          = receitaImpactada * (beneficioPct / 100);
    const receitaLiquida        = receitaAdicional - investimento;
    const roi                   = investimento > 0 ? (receitaLiquida / investimento) * 100 : 0;
    const projecaoAnual         = receitaLiquida * 12;
    const crescimentoPct        = receitaBase > 0 ? (receitaAdicional / receitaBase) * 100 : 0;

    return {
      ticketProjetado,
      clientesRetornam,
      receitaAdicional,
      investimento,
      receitaLiquida,
      roi,
      projecaoAnual,
      crescimentoPct,
    };
  }, [clientesAtivos, ticketAtual, comprasMes, beneficioPct, taxaRetorno, aumentoTicket, pctRetornam, freqApos]);

  const insightText = useMemo(() => {
    const campLabels: Record<string, string> = {
      cashback: "cashback", progressivo: "desconto progressivo", combo: "combo", cupom: "cupom"
    };
    const tipo = campLabels[campanha] ?? "campanha";
    const crescStr = calc.crescimentoPct > 0 ? pct(calc.crescimentoPct) : "expressivo";
    return `Com uma campanha de ${tipo} e ${beneficioPct}% de benefício, você pode gerar um aumento de ${crescStr} na receita mensal, com ${fmtNum(calc.clientesRetornam)} clientes retornando. Isso significa mais previsibilidade de vendas e menor dependência de campanhas agressivas de desconto.`;
  }, [campanha, beneficioPct, calc]);

  const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section id="como-funciona" className="km-section bg-background">
      <div className="km-container">

        {/* ── Section header ── */}
        <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-accent px-3 py-1.5 rounded-full mb-4">
            <BarChart3 className="w-3 h-3" /> Calculadora de Impacto
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Quanto dinheiro uma campanha{" "}
            <span className="text-gradient">gera para você?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Preencha os dados do seu negócio e veja o impacto financeiro em tempo real.
            Sem cadastro, sem bloqueio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start max-w-6xl mx-auto">

          {/* ══ LEFT: INPUTS ════════════════════════════════════════════════ */}
          <div className="space-y-6">

            {/* Bloco 1 — Contexto */}
            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">Bloco 1</p>
                  <h3 className="font-display text-base font-bold text-foreground leading-tight">
                    Contexto do negócio
                  </h3>
                </div>
              </div>

              <SliderRow
                label="Clientes ativos"
                value={clientesAtivos}
                display={fmtNum(clientesAtivos)}
                min={100} max={50000} step={100}
                onChange={setClientesAtivos}
              />
              <SliderRow
                label="Ticket médio atual"
                value={ticketAtual}
                display={fmt(ticketAtual)}
                min={30} max={3000} step={10}
                onChange={setTicketAtual}
              />
              <SliderRow
                label="Compras por mês (média)"
                value={comprasMes}
                display={`${comprasMes.toFixed(1)}x / mês`}
                min={0.5} max={6} step={0.1}
                onChange={setComprasMes}
              />
            </motion.div>

            {/* Bloco 2 — Mecânica */}
            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Tag className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">Bloco 2</p>
                  <h3 className="font-display text-base font-bold text-foreground leading-tight">
                    Mecânica da campanha
                  </h3>
                </div>
              </div>

              {/* Campaign type pills */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Tipo de campanha</p>
                <div className="flex flex-wrap gap-2">
                  {CAMPAIGN_TYPES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setCampanha(id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        campanha === id
                          ? "gradient-primary text-primary-foreground border-transparent shadow-sm"
                          : "bg-background border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <SliderRow
                label="Percentual de benefício"
                value={beneficioPct}
                display={`${beneficioPct}%`}
                min={1} max={40} step={1}
                onChange={setBeneficioPct}
              />
              <SliderRow
                label="Taxa estimada de recompra"
                value={taxaRetorno}
                display={`${taxaRetorno}%`}
                min={2} max={60} step={1}
                onChange={setTaxaRetorno}
                hint="Com comunicação e ativação, campanhas podem gerar aumento de recorrência."
              />
            </motion.div>

            {/* Bloco 3 — Comportamento */}
            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">Bloco 3</p>
                  <h3 className="font-display text-base font-bold text-foreground leading-tight">
                    Impacto no comportamento
                  </h3>
                </div>
              </div>

              <SliderRow
                label="Aumento esperado no ticket médio"
                value={aumentoTicket}
                display={`+${aumentoTicket}%`}
                min={0} max={60} step={1}
                onChange={setAumentoTicket}
              />
              <SliderRow
                label="Percentual de clientes que retornam"
                value={pctRetornam}
                display={`${pctRetornam}%`}
                min={2} max={80} step={1}
                onChange={setPctRetornam}
              />
              <SliderRow
                label="Frequência de compra após campanha"
                value={freqApos}
                display={`${freqApos.toFixed(1)}x / mês`}
                min={0.5} max={8} step={0.1}
                onChange={setFreqApos}
              />
            </motion.div>
          </div>

          {/* ══ RIGHT: RESULTS ════════════════════════════════════════════ */}
          <div className="space-y-6 lg:sticky lg:top-24">

            {/* Result cards grid */}
            <div>
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Resultado em tempo real
              </p>
              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  icon={DollarSign}
                  label="Receita adicional / mês"
                  value={fmt(calc.receitaAdicional)}
                  sub={calc.crescimentoPct > 0 ? `+${pct(calc.crescimentoPct)} vs. atual` : undefined}
                  highlight
                  delay={0}
                />
                <ResultCard
                  icon={TrendingUp}
                  label="Novo ticket médio"
                  value={fmt(calc.ticketProjetado)}
                  sub={`era ${fmt(ticketAtual)}`}
                  delay={0.05}
                />
                <ResultCard
                  icon={RefreshCw}
                  label="Clientes que retornam"
                  value={fmtNum(calc.clientesRetornam)}
                  sub={`de ${fmtNum(clientesAtivos)} ativos`}
                  delay={0.1}
                />
                <ResultCard
                  icon={Percent}
                  label="Investimento promocional"
                  value={fmt(calc.investimento)}
                  sub="benefício concedido / mês"
                  delay={0.15}
                />
                <ResultCard
                  icon={BarChart3}
                  label="Retorno líquido (ROI)"
                  value={calc.roi > 0 ? `${calc.roi.toFixed(0)}%` : "—"}
                  sub="receita gerada ÷ investimento"
                  delay={0.2}
                />
                <ResultCard
                  icon={Calendar}
                  label="Projeção anual"
                  value={fmt(calc.projecaoAnual)}
                  sub="resultado acumulado em 12 meses"
                  delay={0.25}
                />
              </div>
            </div>

            {/* Insight block */}
            <motion.div
              key={insightText}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm font-bold text-foreground">O que isso significa na prática</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{insightText}</p>
            </motion.div>

            {/* Motor automation block */}
            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm font-bold text-foreground mb-4">
                E tudo isso acontece automaticamente
              </p>
              <div className="space-y-2.5">
                {AUTOMATIONS.map(({ label, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA leve */}
            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-primary/30 bg-accent p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground mb-0.5">Pronto para ativar na sua rede?</p>
                <p className="text-xs text-muted-foreground">Leve esse modelo para a prática com o Motor Kmillion.</p>
              </div>
              <Button
                className="gradient-primary text-primary-foreground hover:opacity-90 rounded-xl whitespace-nowrap border-0 shrink-0"
                onClick={() => document.getElementById("encerramento")?.scrollIntoView({ behavior: "smooth" })}
              >
                Quero aplicar isso <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { RiskAnalysis } from '@/lib/simulation';

export interface RiskPanelProps {
  risks?: RiskAnalysis;
}

const defaultRisks = [
  { label: 'Subida del dólar', value: 2 },
  { label: 'Demanda verano', value: 4.5 },
  { label: 'Nueva competencia', value: 2.5 },
  { label: 'Costos energía', value: 3.5 },
];

function percentToClass(percent: number): string {
  if (percent <= 1) return 'risk-fill-20';
  if (percent <= 2) return 'risk-fill-25';
  if (percent <= 3) return 'risk-fill-30';
  if (percent <= 4) return 'risk-fill-40';
  if (percent <= 5) return 'risk-fill-45';
  return 'risk-fill-50';
}

export function RiskPanel({ risks }: RiskPanelProps) {
  const riskData = risks
    ? [
        { label: 'Variación dólar', value: risks.dolarVariation },
        { label: 'Variación demanda', value: risks.demandVariation },
        { label: 'Nueva competencia', value: risks.competitionVariation },
        { label: 'Variación energía', value: risks.energyCostVariation },
      ]
    : defaultRisks;

  const totalImpact = risks?.totalImpact ?? 1.3;

  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Análisis de Riesgos</h2>
        <span>Impacto estimado</span>
      </div>

      <div className="risk-list">
        {riskData.map((risk) => (
          <div className="risk-item" key={risk.label}>
            <strong>{risk.label}</strong>
            <div className="risk-bar">
              <span className={percentToClass(risk.value)} title={`${risk.value}%`} />
            </div>
          </div>
        ))}
      </div>

      <div className="impact-card">
        <p>Impacto total estimado</p>
        <strong>{totalImpact > 0 ? '+' : ''}{totalImpact.toFixed(1)}%</strong>
      </div>
    </article>
  );
}

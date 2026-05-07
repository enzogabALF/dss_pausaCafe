'use client';

import { RiskAnalysis } from '@/lib/simulation';
import { useEffect, useState, useRef } from 'react';

export interface RiskPanelProps {
  risks?: RiskAnalysis;
  onRisksChange?: (risks: RiskAnalysis) => void;
  isLoading?: boolean;
}

const DEFAULT_RISKS = {
  dolarVariation: 2,
  demandVariation: 4.5,
  competitionVariation: 2.5,
  energyCostVariation: 3.5,
  totalImpact: 1.3,
};

const DEBOUNCE_DELAY = 500;

function percentToClass(percent: number): string {
  if (percent <= 1) return 'risk-fill-20';
  if (percent <= 2) return 'risk-fill-25';
  if (percent <= 3) return 'risk-fill-30';
  if (percent <= 4) return 'risk-fill-40';
  if (percent <= 5) return 'risk-fill-45';
  return 'risk-fill-50';
}

export function RiskPanel({ risks, onRisksChange, isLoading }: RiskPanelProps) {
  const [dolarVar, setDolarVar] = useState(risks?.dolarVariation ?? DEFAULT_RISKS.dolarVariation);
  const [demandVar, setDemandVar] = useState(risks?.demandVariation ?? DEFAULT_RISKS.demandVariation);
  const [competitionVar, setCompetitionVar] = useState(risks?.competitionVariation ?? DEFAULT_RISKS.competitionVariation);
  const [energyVar, setEnergyVar] = useState(risks?.energyCostVariation ?? DEFAULT_RISKS.energyCostVariation);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!risks) return;
    setDolarVar(risks.dolarVariation);
    setDemandVar(risks.demandVariation);
    setCompetitionVar(risks.competitionVariation);
    setEnergyVar(risks.energyCostVariation);
  }, [risks?.dolarVariation, risks?.demandVariation, risks?.competitionVariation, risks?.energyCostVariation]);

  // Efecto reactivo para cambios de riesgo
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const totalImpact = ((dolarVar + demandVar + competitionVar + energyVar) / 4) * 0.31;
      
      const newRisks: RiskAnalysis = {
        dolarVariation: dolarVar,
        demandVariation: demandVar,
        competitionVariation: competitionVar,
        energyCostVariation: energyVar,
        totalImpact: Math.round(totalImpact * 10) / 10,
      };

      if (onRisksChange) {
        onRisksChange(newRisks);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [dolarVar, demandVar, competitionVar, energyVar]);

  const totalImpact = risks?.totalImpact ?? DEFAULT_RISKS.totalImpact;

  const riskControls = [
    { label: 'Variación dólar', value: dolarVar, onChange: setDolarVar, field: 'dolar' },
    { label: 'Variación demanda', value: demandVar, onChange: setDemandVar, field: 'demand' },
    { label: 'Nueva competencia', value: competitionVar, onChange: setCompetitionVar, field: 'competition' },
    { label: 'Variación energía', value: energyVar, onChange: setEnergyVar, field: 'energy' },
  ];

  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Análisis de Riesgos</h2>
        <span>Impacto estimado - Modificable</span>
      </div>

      <div className="risk-list">
        {riskControls.map((control) => (
          <label className="risk-item" key={control.field}>
            <strong>{control.label}</strong>
            <div className="risk-control-group">
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={control.value}
                onChange={(e) => control.onChange(parseFloat(e.target.value))}
                disabled={isLoading}
                className="risk-slider"
                aria-label={`Modificar ${control.label}`}
              />
              <span className="risk-value">{control.value.toFixed(1)}%</span>
            </div>
            <div className="risk-bar">
              <span className={percentToClass(control.value)} title={`${control.value}%`} />
            </div>
          </label>
        ))}
      </div>

      <div className="impact-card">
        <p>Impacto total estimado</p>
        <strong>{totalImpact > 0 ? '+' : ''}{totalImpact.toFixed(1)}%</strong>
      </div>

      <div className="risk-note">
        Ajusta los parámetros de riesgo - los cambios se reflejan automáticamente
      </div>
    </article>
  );
}

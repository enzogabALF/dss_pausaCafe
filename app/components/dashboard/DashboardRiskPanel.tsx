'use client';

import { useState, useEffect, useRef } from 'react';

export interface DashboardRiskPanelProps {
  onRisksChange?: (risks: DashboardRisks) => void;
}

export interface DashboardRisks {
  dolarVariation: number;
  demandVariation: number;
  competitionVariation: number;
  energyCostVariation: number;
  totalImpact: number;
}

const DEFAULT_RISKS: DashboardRisks = {
  dolarVariation: 5,
  demandVariation: 3.5,
  competitionVariation: 2.5,
  energyCostVariation: 4,
  totalImpact: -7.2,
};

const DEBOUNCE_DELAY = 300;

function percentToClass(percent: number): string {
  if (percent <= 1) return 'risk-fill-20';
  if (percent <= 2) return 'risk-fill-25';
  if (percent <= 3) return 'risk-fill-30';
  if (percent <= 4) return 'risk-fill-40';
  if (percent <= 5) return 'risk-fill-45';
  return 'risk-fill-50';
}

export function DashboardRiskPanel({ onRisksChange }: DashboardRiskPanelProps) {
  const [dolarVar, setDolarVar] = useState(DEFAULT_RISKS.dolarVariation);
  const [demandVar, setDemandVar] = useState(DEFAULT_RISKS.demandVariation);
  const [competitionVar, setCompetitionVar] = useState(DEFAULT_RISKS.competitionVariation);
  const [energyVar, setEnergyVar] = useState(DEFAULT_RISKS.energyCostVariation);
  const [totalImpact, setTotalImpact] = useState(DEFAULT_RISKS.totalImpact);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto reactivo para cambios de riesgo
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const avgRisks = (dolarVar + demandVar + competitionVar + energyVar) / 4;
      const newTotalImpact = -(avgRisks * 0.38);
      
      const newRisks: DashboardRisks = {
        dolarVariation: dolarVar,
        demandVariation: demandVar,
        competitionVariation: competitionVar,
        energyCostVariation: energyVar,
        totalImpact: Math.round(newTotalImpact * 10) / 10,
      };

      setTotalImpact(newRisks.totalImpact);

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

  const riskControls = [
    { label: 'Subida del dólar', value: dolarVar, onChange: setDolarVar, field: 'dolar' },
    { label: 'Demanda verano', value: demandVar, onChange: setDemandVar, field: 'demand' },
    { label: 'Nueva competencia', value: competitionVar, onChange: setCompetitionVar, field: 'competition' },
    { label: 'Costos energía', value: energyVar, onChange: setEnergyVar, field: 'energy' },
  ];

  return (
    <article className="panel panel-wide">
      <div className="panel-title-row">
        <h2>Análisis de Riesgos</h2>
        <span>Factores externos e impacto - Modificable</span>
      </div>

      <div className="risk-list">
        {riskControls.map((control) => (
          <label className="risk-item" key={control.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong>{control.label}</strong>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                {control.value.toFixed(1)}%
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={control.value}
                onChange={(e) => control.onChange(parseFloat(e.target.value))}
                className="risk-slider"
                aria-label={`Modificar ${control.label}`}
                style={{ flex: 1 }}
              />
            </div>
            <div className="risk-bar">
              <span className={`risk-fill ${percentToClass(control.value)}`} title={`${control.value}%`} />
            </div>
          </label>
        ))}
      </div>

      <div className="impact-card">
        <p>Impacto total estimado</p>
        <strong style={{ color: totalImpact < -5 ? '#ef4444' : totalImpact < -2 ? '#f97316' : '#6b7280' }}>
          {totalImpact.toFixed(1)}%
        </strong>
      </div>

      <div className="risk-note" style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        ⚡ Ajusta los factores de riesgo - los cambios se reflejan automáticamente en el impacto total
      </div>
    </article>
  );
}

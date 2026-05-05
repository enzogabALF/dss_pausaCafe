'use client';

import { useEffect, useState } from 'react';
import type { ReportMetadata } from '@/lib/types';

export function ReportHistoryPanel() {
  const [history, setHistory] = useState<ReportMetadata[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadHistory = async () => {
      try {
        const endpoint = new URL('/api/reports', window.location.origin || 'http://localhost').toString();
        const response = await fetch(endpoint);
        const payload = await response.json();

        if (mounted && Array.isArray(payload?.data)) {
          setHistory(payload.data as ReportMetadata[]);
        }
      } catch (error) {
        console.error('No se pudo cargar el historial de reportes:', error);
      }
    };

    loadHistory();

    return () => {
      mounted = false;
    };
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Historial de Reportes</h2>
        <span>Descargas recientes</span>
      </div>

      <div className="saved-scenarios-list">
        {history.map((report) => (
          <div key={report.id} className="saved-scenario-card">
            <div className="saved-scenario-header">
              <div>
                <strong>{report.title}</strong>
                <p className="saved-scenario-date">{new Date(report.createdAt).toLocaleString('es-CO')}</p>
              </div>
              <span className="saved-scenario-van">{report.format.toUpperCase()}</span>
            </div>

            <div className="saved-scenario-tags">
              <span>{report.scenarioName}</span>
              <span>Inversión: ${report.investment.toLocaleString('es-CO')}</span>
              <span>Pedidos: {report.dailyOrders}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Alert } from '@/lib/types';

export default function AlertsList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadAlerts = async () => {
      try {
        const endpoint = new URL('/api/alerts', window.location.origin || 'http://localhost').toString();
        const response = await fetch(endpoint);
        const payload = await response.json();
        if (mounted && Array.isArray(payload?.data)) {
          setAlerts(payload.data as Alert[]);
        }
      } catch (error) {
        console.error('No se pudieron cargar las alertas:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAlerts();

    return () => {
      mounted = false;
    };
  }, []);

  const grouped = useMemo(() => ({
    criticalAlerts: alerts.filter((a) => a.priority === 'critical'),
    warningAlerts: alerts.filter((a) => a.priority === 'warning'),
    infoAlerts: alerts.filter((a) => a.priority === 'info'),
  }), [alerts]);

  if (loading) {
    return <div className="alerts-list-container">Cargando alertas...</div>;
  }

  const renderAlert = (alert: Alert) => (
    <div key={alert.id} className={`alert-card alert-${alert.priority}`}>
      <div className="alert-header">
        <div className="alert-title-group">
          <span className={`alert-icon alert-icon-${alert.priority}`}>
            {alert.priority === 'critical' && '🚨'}
            {alert.priority === 'warning' && '⚠️'}
            {alert.priority === 'info' && 'ℹ️'}
          </span>
          <div>
            <h4>{alert.title}</h4>
            <span className="alert-category">{alert.category}</span>
          </div>
        </div>
        <span className={`alert-scenario alert-scenario-${alert.scenario.toLowerCase()}`}>
          {alert.scenario}
        </span>
      </div>

      <p className="alert-description">{alert.description}</p>

      <div className="alert-footer">
        <span className="alert-timestamp">{alert.timestamp}</span>
        {alert.actionable && (
          <div className="alert-actions">
            <button className="alert-action-btn dismiss" type="button">
              Descartar
            </button>
            <button className="alert-action-btn implement" type="button">
              Implementar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="alerts-list-container">
      {grouped.criticalAlerts.length > 0 && (
        <section className="alerts-section">
          <h3>🚨 Alertas Críticas ({grouped.criticalAlerts.length})</h3>
          <div className="alerts-group">
            {grouped.criticalAlerts.map(renderAlert)}
          </div>
        </section>
      )}

      {grouped.warningAlerts.length > 0 && (
        <section className="alerts-section">
          <h3>⚠️ Advertencias ({grouped.warningAlerts.length})</h3>
          <div className="alerts-group">
            {grouped.warningAlerts.map(renderAlert)}
          </div>
        </section>
      )}

      {grouped.infoAlerts.length > 0 && (
        <section className="alerts-section">
          <h3>ℹ️ Información ({grouped.infoAlerts.length})</h3>
          <div className="alerts-group">
            {grouped.infoAlerts.map(renderAlert)}
          </div>
        </section>
      )}
    </div>
  );
}
